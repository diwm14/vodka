import { Col, DatePicker, Form, Input, Modal, Row } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { postEntry, wrapWithFields } from "../../api/client";
import { entryToLink } from "../../functions/functions";
import useMember from "../../hooks/useMember";
import useStore from "../../hooks/useStore";
import { BoardlifeBoardgame } from "../../types/type";
import DifficultyForm from "../Form/DifficultyForm";
import RateForm from "../Form/RateForm";
import MemberSelect from "../Member/MemberSelect";
import BoardgameSearchBox from "./BoardgameSearchBox";

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: () => void;
  onCancel: () => void;
}

const NewCommentModal = ({
  open,
  onCreate,
  onCancel,
}: CollectionCreateFormProps) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const {getMemberByName} = useMember();
  const {update} = useStore();
  // 실질적으로 폼에서 관리되는 데이터가 아니기 때문에 그냥 스테이트로 관리 합시다.
  const [gameInfo, setGameInfo] = useState<BoardlifeBoardgame>();



  const onOk = async () => {
    setConfirmLoading(true);

    try {

        if(!gameInfo) {
          (form as any).resetFields(['title']);
        }

        const values = await (form as any)
          .validateFields();
        
        // API 데이터로 가공
        // 게임 타이틀만 하려고 했는데, 그냥 게임 정보 다 넣어도 될 듯
        // 작성자 string to Entry
        let sendData;
        if(values.author) {
            sendData = {...values, gameInfo, author: entryToLink(getMemberByName(values.author))};
        } else {
            sendData = {...values, gameInfo};
        }

        const wrappedData = wrapWithFields(sendData);

        // api call
        await postEntry('boardgame', wrappedData);
        // 전체 데이터 다시 불러오기
        // 보드게임만 업데이트 해도 되긴 할텐데, 데이터 형식 맞추기 넘 귀찮
        update();
        (form as any).resetFields();        
        onCreate();
    } catch(info) {
        console.log("Validate Failed:", info);
    } finally {
        setConfirmLoading(false);
    }
  };

  return (
    <Modal title="게임 평가하기" open={open} onOk={onOk} onCancel={onCancel} confirmLoading={confirmLoading}>
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          difficulty: 1,
          rating: 3,
        }}
      >
        <Form.Item
          name="title"
          label="보드게임"
          rules={[
            {
              required: true,
              message: "보드게임을 검색해주세요",
            },
          ]}
        >
          <BoardgameSearchBox setGameInfo={setGameInfo} />
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item
              label="작성자"
              name="author"
              style={{ paddingRight: "12px" }}
            >
              <MemberSelect />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="playDate"
              label="플레이 날짜"
              rules={[
                {
                  required: true,
                  message: "날짜를 입력해주세요",
                },
              ]}
            >
              <DatePicker initialValues={moment()} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name="rating"
              label="평점"
              rules={[
                {
                  required: true,
                  message: "게임을 평가해주세요",
                },
              ]}
            >
              <RateForm />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="difficulty" label="난이도">
              <DifficultyForm />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="comment" label="게임 후기">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewCommentModal;
