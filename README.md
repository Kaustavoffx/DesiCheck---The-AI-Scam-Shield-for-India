# 🛡️ DesiCheck - The AI Scam Shield for India

![Status](https://img.shields.io/badge/Status-Deployed-success?style=for-the-badge)
![Tech](https://img.shields.io/badge/Built%20With-Gemini%203%20Pro-4285F4?style=for-the-badge&logo=google)
![Platform](https://img.shields.io/badge/Platform-Google%20Cloud%20Run-blue?style=for-the-badge&logo=googlecloud)
![IDE](https://img.shields.io/badge/Dev%20Env-Project%20IDX-purple?style=for-the-badge)

> **"A Tier-0 Security Analyst for the Common Man."** > *Fighting misinformation and 'WhatsApp University' scams with Multimodal AI.*

---

## 🔗 Live Demo
🔴 **Live App:** (https://desicheck-2364229762.us-west1.run.app/)  
📺 **Video Demo:** (https://youtu.be/MYii6km3YI0)

---

## 💡 Inspiration
In India, "WhatsApp University" isn't just a joke; it's a crisis. Every day, millions of seniors, students, and regular citizens fall victim to phishing links, fake job offers, and predatory loan apps.

While corporations have Security Operation Centers (SOCs), the common man has no one. I built **DesiCheck** to fill this gap. It is an **Agentic AI Bodyguard** that doesn't just "detect" problems but explains them in simple language and even handles the situation for the user.

---

## 🚀 Features

### 1. 🕵️‍♂️ Scam Triage (AI Screenshot Analysis)
Users upload screenshots of suspicious messages (WhatsApp/SMS). The app uses **Gemini 3 Pro (Multimodal)** to analyze:
* **Visual Cues:** Blurry logos, mismatched fonts, urgency colors.
* **Text Context:** Social engineering tactics (fear, greed, urgency).
* **Output:** A simple "Safe" or "Scam" verdict with a 0-100 Risk Score.

### 2. 🔗 Deep Link Inspector
A forensic tool for URLs. It checks for:
* Typosquatting (e.g., `hdfcc-bank.com`).
* Domain age and reputation.
* Known phishing patterns.

### 3. 🤡 Viral Troll Mode (Counter-Measure Agent)
If a scam is detected, the AI generates a **sarcastic, context-aware reply** in Hinglish (Hindi + English).
* *Goal:* Waste the scammer's time without revealing personal info.
* *Vibe:* "Bhaiya, my cow ate the OTP, please send via pigeon."

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **AI Brain** | **Gemini 3 / 1.5 Flash API** | Multimodal reasoning for image & text analysis. |
| **Development** | **Project IDX** | Cloud-based AI-assisted IDE. |
| **Deployment** | **Google Cloud Run** | Serverless, scalable container hosting. |
| **Container** | **Docker** | Containerization for consistent environments. |
| **Frontend** | **Vanilla HTML/CSS/JS** | Lightweight PWA for fast loading on mobile networks. |

---

## 📸 Screenshots

| **Home Screen** | **Scam Detected** | **Safe Verdict** |
|:---:|:---:|:---:|
| ![Home](https://via.placeholder.com/200x400?text=Home) | ![Scam](https://via.placeholder.com/200x400?text=Scam+Result) | ![Safe](https://via.placeholder.com/200x400?text=Safe+Result) |

*(Upload your actual screenshots to an `assets` folder and update these links)*

---

## ⚡ How to Run Locally

This project was built using **Project IDX**. To run it locally or in your own environment:

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/DesiCheck.git](https://github.com/YOUR_USERNAME/DesiCheck.git)
    cd DesiCheck
    ```

2.  **Set up API Key**
    * Get a free API Key from [Google AI Studio](https://aistudio.google.com/).
    * Create a `.env` file or paste it directly into `script.js` (for local testing only).

3.  **Run with Docker (Recommended)**
    ```bash
    docker build -t desicheck .
    docker run -p 8080:8080 desicheck
    ```

4.  **Run with Simple Server**
    If you have Python installed:
    ```bash
    python3 -m http.server 8080
    ```
    Then open `http://localhost:8080` in your browser.

---

## 🔮 Future Roadmap
* [ ] **Voice Mode:** Audio input/output for users who cannot read/write text.
* [ ] **Regional Languages:** Full support for Bengali, Tamil, and Telugu.
* [ ] **Community Database:** A shared ledger of reported scam numbers.

---

## 🤝 Contributing
Contributions are welcome! Please fork the repo and submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 👨‍💻 Author
**Kaustav Chowdhury** *Full Stack Developer & AI Enthusiast*

---

<p align="center">
  Made with ❤️ in India 🇮🇳 using <b>Project IDX</b> & <b>Gemini API</b>
</p>
