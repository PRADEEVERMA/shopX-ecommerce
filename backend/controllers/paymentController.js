import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createPaymentOrder = async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body;
    const orderOptions = {
      amount: Math.round(amount * 100),
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(orderOptions);

    res.json(order);
  } catch (error) {
    console.error("Create payment order error:", error);
    res.status(500).json({
      message: error.message || "Unable to create payment order",
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.json({
        success: true,
        message: "Payment verified successfully",
      });
    }

    res.status(400).json({
      success: false,
      message: "Payment verification failed",
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    res.status(500).json({
      message: error.message || "Unable to verify payment",
    });
  }
};

export { createPaymentOrder, verifyPayment };