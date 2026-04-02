import "dotenv/config";
import upload from "./middleware/upload.js"
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

app.get("/buy/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    })
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "No details are available" });
  }
})

//! Review system


//GET review
app.get("/reviews/:productId", async (req, res) => {

  try {
    const reviews = await prisma.review.findMany({
      where: { productId: Number(req.params.productId) },
      include: {
        user: true,
      },
    });
    // if(!reviews) return res.json({ message: "Give your review"});
    res.json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).json({ er: " Failed to fetch reviews" });
  }
});

// POST review
app.post("/review", upload.single("image"), async (req, res) => {
  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    console.log("BODY", req.body);
    console.log("FILE", req.file);

    const review = await prisma.review.create({
      data: {
        productId: Number(req.body.productId),
        userId: user.id,
        rating: Number(req.body.rating),
        comment: req.body.comment,
        image: req.file?.path || null,
      }
    });

    res.json(review);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create review " });
  }
});


//!:-- From here authentication is started

app.get("/signup", function (req, res) {

  res.json({ message: "Sign up endpoint ready" });
})

app.post("/signup", async (req, res) => {
  try {
    let { username, email, password, age, address, phone, city, state, pincode } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hash,
        age: Number(age),
        phone,
        address,
        city,
        state,
        pincode,
      },
    });

    const token = jwt.sign({
      userId: user.id,
      email: user.email
    }, "mysecretKey");

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/"
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

app.get("/me", async (req, res) => {
  const user = await getUserFromToken(req);
  if (!user) {
    return res.status(401).json({ user: null });
  }
  res.json({ user });
});

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
      email: user.email
    },
      "mysecretKey");


    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/"
    });
    res.status(200).json({
      message: "You sign in",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  }
  else res.status(400).json({ message: "Something went wrong" });
})


app.post("/signout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/"
  });
  // Fortce to delete stored cookie inside browser 
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "lax",
    secure: false,
    path: "/"
  })
  res.json({ message: "Sign out successful" });
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
      cartItem: {
        include: {
          product: true,
        },
      },
    },
  });

  res.json(cart?.cartItem || []);
});

//! Increase cart item
app.post("/cart/increase", async (req, res) => {
  const user = await getUserFromToken(req);

  if (!user) {
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

  if (!user) {
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


app.get("/profile", async (req, res) => {
  const user = await getUserFromToken(req);
  if (!user) return res.status(401).json({});
  res.json(user);
})

app.put("/profile", async (req, res) => {
  const user = await getUserFromToken(req);
  if (!user) return res.status(401).json({});

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: req.body,
  });

  res.json(updated);
})

app.get("/orders", async (req, res) => {
  const user = await getUserFromToken(req);
  if (!user) return res.status(401).json([]);
  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  res.json(orders);
})


app.post("/order", async (req, res) => {
  try {
    const user = await getUserFromToken(req);
    if (!user) return res.status(401).json({});

    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    //  Fetch products
    const productIds = items.map((i: any) => i.productId);

    const products = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });

    //  Calculate total
    let total = 0;

    const orderItemsData = items.map((item: any) => {
      const product = products.find(p => p.id === item.productId);

      if (!product) throw new Error("Product not found");

      total += product.price * item.quantity;

      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      };
    });

    //  Create order
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total,
        status: "pending",
        items: {
          create: orderItemsData
        }
      },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    //  CLEAR CART (FIXED)
    await prisma.cartItem.deleteMany({
      where: {
        cart: {
          userId: user.id
        }
      }
    });

    res.json(order);

  } catch (err: any) {
    console.error("ORDER ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});





app.listen(process.env.PORT || 5000, () => {
  console.log("Server running ");
});
