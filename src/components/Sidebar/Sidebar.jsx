import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { useState, useContext } from "react";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompt, setRecentPrompt } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="menu icon"
        />
        <div className="new-chat" onClick={() => loadPrompt("New Chat")}>
          <img src={assets.plus_icon} alt="plus icon" />
          {extended && <p>New Chat</p>}
        </div>
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item, index) => (
              <div
                className="recent-entry"
                key={index}
                onClick={() => loadPrompt(item)}
              >
                <img src={assets.message_icon} alt="message icon" />
                <p>{item.slice(0, 18)} ...</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="bottom-itm recent-entry">
          <img src={assets.question_icon} alt="question icon" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-itm recent-entry">
          <img src={assets.setting_icon} alt="setting icon" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-itm recent-entry">
          <img src={assets.history_icon} alt="history icon" />
          {extended && <p>Setting</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
