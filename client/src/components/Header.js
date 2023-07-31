import React, { useState } from "react";
import logo from "../img/logo2.png";
import menu from "../img/icons8-menu-rounded-50.png";
import noti from "../img/icons8-알림-30.png";
import isNoti from "../img/icons8-알림O-30.png";
import Modal from "./MenuModal";
import styles from "./Header.module.css";
import TopicMenuModal from "./TopicMenumodal";
import NotiModal from "./NotiModal";
import share from "../img/icons8-공유-30.png";
const Header = (props) => {
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showTopicMenuModal, setShowTopicMenuModal] = useState(false);

  const handleMenuClick = () => {
    setShowMenuModal(true);
  };
  const shareClickButton = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("클립보드에 복사되었습니다. 링크를 활용하여 공유하세요!");
  };
  const handleNotificationClick = () => {
    setShowNotificationModal(true);
  };

  const handlTopicMenuClick = () => {
    setShowTopicMenuModal(true);
  };

  const handleCloseModal = () => {
    setShowMenuModal(false);
    setShowNotificationModal(false);
    setShowTopicMenuModal(false);
  };

  return (
    <div className={styles.container}>
      {props.useMenuButton ? (
        <img
          className={styles.menuIcon}
          src={menu}
          alt="menu"
          onClick={handleMenuClick}
        />
      ) : props.useTopicMenuButton ? (
        <img
          className={styles.menuIcon}
          src={menu}
          alt="menu"
          onClick={handlTopicMenuClick}
        />
      ) : (
        <div className={styles.placeholder} />
      )}
      <img
        className={styles.logo}
        src={logo}
        alt="logo"
        onClick={() => {
          window.location.href = "/main";
        }}
      />

      {props.useNotiButton ? (
        props.isNoti ? (
          <img
            className={styles.notificationIcon}
            src={isNoti}
            alt="noti"
            onClick={handleNotificationClick}
          />
        ) : (
          <img
            className={styles.notificationIcon}
            src={noti}
            alt="noti"
            onClick={handleNotificationClick}
          />
        )
      ) : props.useTopicMenuButton ? (
        <img
          className={styles.menuIcon}
          src={share}
          alt="share"
          onClick={shareClickButton}
        />
      ) : (
        <div className={styles.placeholder} />
      )}
      {showMenuModal && (
        <Modal
          show={showMenuModal}
          onClose={handleCloseModal}
          title="Menu"
        ></Modal>
      )}
      {showNotificationModal && (
        <NotiModal
          show={showNotificationModal}
          onClose={handleCloseModal}
          title="Notification"
          notiArray={props.notiArray}
        ></NotiModal>
      )}
      {showTopicMenuModal && (
        <TopicMenuModal
          topicId={props.topicId}
          visible={props.visible}
          show={showTopicMenuModal}
          deleteTopic={props.deleteTopic}
          onClose={handleCloseModal}
          title="Topic Menu"
        ></TopicMenuModal>
      )}
    </div>
  );
};

export default Header;
