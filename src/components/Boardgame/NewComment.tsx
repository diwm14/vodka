import { PlusCircleOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React, { useState } from 'react';
import NewCommentModal from './NewCommentModal';

const NewComment = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);


    const handleNewCommentClick = () => {
        if(!modalOpen) {
            setModalOpen(true);
        }
    }

    const onCreate = () => {
        // console.log('Received values of form: ', values);
        setModalOpen(false);
      };

    const handleCancel = () => {
        setModalOpen(false);
    }
    
    return (
        <div className="new-comment" onClick={handleNewCommentClick}>
            <Card loading={true}></Card>
            <div className="inner">
                <PlusCircleOutlined />
                <span className="label">게임 평가하기</span>
            </div>
            {modalOpen && <NewCommentModal open={modalOpen} onCreate={onCreate}  onCancel={handleCancel} />}
        </div>
    )
}

export default NewComment
