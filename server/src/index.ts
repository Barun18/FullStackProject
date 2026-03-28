import express from "express";
const app = express();
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
app.use(cookieParser());
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

//! Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


//! Display products
app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany({
    include: {
      category: true
    }
  });
  res.json(products);
});


app.get("/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product" });
  }
}); 

 
//! Review system


//GET review
app.get("/reviews/:productId", async (req,res) => {
  
  try {
    const reviews = await prisma.review.findMany({
    where: { productId: Number(req.params.productId) },
    include: {
      user: true,
    },
  });
  // if(!reviews) return res.json({ message: "Give your review"});
  res.json(reviews);
}catch(err){
  console.log(err);
  res.status(500).json({ er: " Failed to fetch reviews"});
}
});

// POST review
app.post("/review", async (req,res) =>{
  try{
    console.log("BODY:",req.body);

  const review = await prisma.review.create({
    data: {
      productId: Number(req.body.productId),
      userId:Number(req.body.userId),
      rating: Number(req.body.rating),
      comment: req.body.comment,
    }
  });
  res.json(review);
}catch(err){
  console.error(err);
  res.status(500).json({ error: "Failed to create review "});
}
});


//!:-- From here authentication is started

app.get("/register", function (req, res) {

  res.json({ message: "Register endpoint ready" });
})

app.post("/register", async (req, res) => {
  try {
    let { username, email, password, age } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hash,
        age: Number(age)
      },
    });

    const token = jwt.sign({ 
      userId: user.id,
      email: user.email 
    }, "mysecretKey");

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false
    });
    res.json({ message: "Your accoount is created" });

  } catch (err) {
    console.log(err);
    res.status(500).send("something went wrong");
  }
})


const getUserFromToken = async (req: any) => {
  try {
    const token = req.cookies.token;
    if (!token) return null;

    const decoded: any = jwt.verify(token, "mysecretKey");
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    return user;
  } catch {
    return null
  }
};

app.post("/signin", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email
    },
  })
  if (!user) {
    return res.status(400).json({ error: "Something went wrong" });
  }
  const result = await bcrypt.compare(req.body.password, user.password);
  if (result) {
    const token = jwt.sign({ 
      userId: user.id,
      email: user.email }, 
      "mysecretKey");
    
    res.clearCookie("token");

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    res.status(200).json({ message: "You logged in" });
  }
  else res.status(400).json({ message: "Something went wrong" });

})


app.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict"
  });

  res.json({ message: "Logout successful" });
});



app.listen(5000, () => {
  console.log("Server running on port 5000");
});



//!:-- Handle Cart System 
app.post("/cart/add", async (req, res) => {
  const user = await getUserFromToken(req);
  if (!user) {
    return res.status(401).json({ error: "Unauthoridzed" })
  }
  const { productId } = req.body;

  // 1. Find or create cart
  let cart = await prisma.cart.findUnique({
    where: { userId: user.id },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: user.id },
    });
  }

  // 2. Check if item already exists
  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  // 3. If exists → increase quantity
  if (existingItem) {
    const updated = await prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      data: {
        quantity: existingItem.quantity + 1,
      },
    });

    return res.json(updated);
  }

  // 4. Else → create new item
  const newItem = await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity: 1,
    },
  });

  res.json(newItem);
});


//!:-- get cart with Product details
app.get("/cart", async (req, res) => {
  const user = await getUserFromToken(req);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  res.json(cart?.items || []);
});

//! Increase cart item
app.post("/cart/increase", async (req, res) => {
  const user = await getUserFromToken(req);

  if(!user){
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { productId } = req.body;

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
    });

    if (!cart) return res.status(404).json({ eror: "cart not found" });

    const item = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (!item) return res.status(404).json({ error: "Item not found" });
    const updated = await prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      data: {
        quantity: item.quantity + 1,
      },
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Increase failed" });
  }
});


app.post("/cart/decrease", async (req, res) => {
  const user = await getUserFromToken(req);

  if(!user){
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { productId } = req.body;

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
    });

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (!item) return res.status(404).json({ error: "Item not found" });

    //  if quantity = 1 → delete item
    if (item.quantity === 1) {
      await prisma.cartItem.delete({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId,
          },
        },
      });

      return res.json({ message: "Item removed" });
    }

    //  else decrease quantity
    const updated = await prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      data: {
        quantity: item.quantity - 1,
      },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Decrease failed" });
  }
});


