import React, { useState } from "react";
import styles from "./Modal.module.css";
import Button from "./Button";
import styleButton from "./Button.module.css";
import Scrollbar from "./Scrollbar";
import ScrollbarStyle from "./Scrollbar.module.css";
import Text from "./Text";
import styleText from "./Text.module.css";
import { useNavigate } from "react-router-dom";

const Modal = (props) => {
  const [showInfo, setShowInfo] = useState([false, false, false]);
  const navigate = useNavigate();
  const handleToggle = (index) => {
    const updatedShowInfo = [...showInfo];
    updatedShowInfo[index] = !updatedShowInfo[index];
    setShowInfo(updatedShowInfo);
  };
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{props.title}</h2>
          <button className={styles.closeButton} onClick={props.onClose}>
            X
          </button>
        </div>

        <div className={styles.modalBody}>
          <Scrollbar className={ScrollbarStyle.scrollbar_bigger}>
            <Button
              className={styleButton.button_modal}
              onClick={() => handleToggle(0)}
            >
              계정 설정
            </Button>
            <div>
              {showInfo[0] && (
                <Button
                  className={styleButton.button_modalSmall}
                  onClick={() => {
                    props.onClose();
                    navigate("/main/changepassword");
                  }}
                >
                  비밀번호 변경
                </Button>
              )}
            </div>
            <div>
              {showInfo[0] && (
                <Button
                  className={styleButton.button_modalSmall}
                  onClick={() => {
                    props.onClose();
                    navigate("/main/deleteaccount");
                  }}
                >
                  계정 탈퇴
                </Button>
              )}
            </div>
            <Button
              className={styleButton.button_modal}
              onClick={() => handleToggle(1)}
            >
              SoundMeOut 이란?
            </Button>
            {showInfo[1] && (
              <Text className={styleText.frame_inModal}>
                SoundMeOut은 익명으로 메모를 작성하고 공유할 수 있는 웹
                서비스입니다.
                <br />
                친구에게 공유하고 싶은 메모를 작성하고, 링크를 공유해보세요.
              </Text>
            )}
            <Button
              className={styleButton.button_modal}
              onClick={() => handleToggle(2)}
            >
              이용 약관
            </Button>
            {showInfo[2] && (
              <Text className={styleText.frame_inModal}>
                서비스 이용 약관 동의
                <br />
                1.1. 익명 포스트잇 사이트를 이용하시려면 본 이용약관에 동의해야
                합니다.
                <br />
                1.2. 본 이용약관은 익명 포스트잇 사이트와 이용자 간의 법적인
                관계를 규정합니다.
                <br />
                서비스 이용
                <br />
                2.1. 익명 포스트잇 사이트는 이용자에게 익명으로 메모를 작성하고
                공유할 수 있는 서비스를 제공합니다.
                <br />
                2.2. 이용자는 익명 포스트잇 사이트를 이용하여 다른 이용자와의
                소통, 정보 공유 등을 할 수 있습니다.
                <br />
                이용자의 책임 3.1. 이용자는 익명 포스트잇 사이트를 이용함에 있어
                법률과 규정을 준수해야 합니다.
                <br />
                3.2. 이용자는 자신의 계정 정보를 안전하게 관리하고, 타인에게
                공개되지 않도록 해야 합니다.
                <br />
                3.3. 이용자는 타인의 권리를 침해하지 않도록 해야 하며, 부적절한
                내용의 메모 작성을 피해야 합니다.
                <br />
                서비스 제한 및 중단 4.1. 익명 포스트잇 사이트는 이용자의
                악의적인 행위나 서비스 이용에 부적절한 행위를 발견할 경우, 해당
                이용자의 서비스 이용을 제한하거나 중단할 수 있습니다.
                <br />
                4.2. 익명 포스트잇 사이트는 사전 고지 없이 서비스의 일부 또는
                전부를 수정, 변경, 중단할 수 있으며, 이에 대해 이용자에게 사전
                통지하지 않을 수 있습니다.
                <br />
                개인정보 보호 5.1. 익명 포스트잇 사이트는 이용자의 개인정보를
                적절히 보호하기 위해 최선의 노력을 다합니다.
                <br />
                5.2. 익명 포스트잇 사이트는 개인정보 처리에 관한 정책을 별도로
                운영하고 있으며, 해당 정책에 따라 이용자의 개인정보를 수집,
                이용, 보관합니다.
              </Text>
            )}
          </Scrollbar>
        </div>
      </div>
    </div>
  );
};

export default Modal;
