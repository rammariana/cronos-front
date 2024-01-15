import { useEffect } from "react";
import "./Bot.css";

function Bot() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.botpressWebChat.init({
        composerPlaceholder: "Chat with Cronos",
        botConversationDescription: "Hi! I'm your friend Cronos",
        botId: "0639b0b1-ba2d-4afb-882c-7f6dff99d7e2",
        hostUrl: "https://cdn.botpress.cloud/webchat/v1",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "0639b0b1-ba2d-4afb-882c-7f6dff99d7e2",
        webhookId: "06a48d1e-8485-4c2a-af1b-89be6fadd5f5",
        lazySocket: true,
        themeName: "prism",
        botName: "Cronos",
        avatarUrl:
          "https://firebasestorage.googleapis.com/v0/b/bd-audios.appspot.com/o/bot.png?alt=media&token=4738ce93-39a8-48ec-bbbe-1462008d3b02",
        frontendVersion: "v1",
        stylesheet:
          "https://webchat-styler-css.botpress.app/prod/code/8f76a885-5928-4d12-8e19-cae19d9d2c2f/v96397/style.css",
        useSessionStorage: true,
        enableConversationDeletion: true,
        theme: "prism",
        themeColor: "#3EFD72",
      });
    };
  }, []);

  return <div id="webchat" />;
}
export default Bot;
