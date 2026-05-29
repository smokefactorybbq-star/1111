import express from "express";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/api/log", async (req, res) => {
  const { action, time } = req.body || {};

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  if (BOT_TOKEN && CHAT_ID) {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: `🔮 Действие на сайте\n\nДействие: ${action}\nВремя: ${time}`
      })
    });
  }

  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
