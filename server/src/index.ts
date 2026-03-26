import express from "express";
const app = express();
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import productRoutes from "./routes/product.routes.js";
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

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

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

//TODO:-- From here authentication is started

// app.get("/", function (req, res) {
//     res.send("working");
// })
app.get("/register", function (req, res) {
  // res.render("register");
  res.json({ message: "Register endpoint ready" });
})

app.post("/register", async (req, res) => {
  try {
    let { username, email, password, age } = req.body;

    // bcrypt.genSalt(10, (err, salt) => {
    //     bcrypt.hash(password, salt, async (err, hash) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await prisma.user.create({
      data: {
        username,
        email,
        password: hash,
        age: Number(age)
      },
    });

    const token = jwt.sign({ email }, "mysecretKey");
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
      const token = jwt.sign({ email: user.email }, "mysecretKey");
      res.cookie("token", token, { httpOnly: true });
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



//TODO:-- request for adding cart item into cartItem
app.post("/cart/add", async (req, res) => {
  
  const { userId, productId } = req.body;

  try {
    // 1. Find or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding to cart" });
  }
});


//TODO:-- get cart with Product details
app.get("/cart/:userId", async (req, res) => {
  const userId = Number(req.params.userId);

  const cart = await prisma.cart.findUnique({
    where: { userId },
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