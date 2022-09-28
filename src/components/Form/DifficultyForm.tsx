import React from "react";
import { Rate } from "antd";
import { CustomFormItemProps } from "../../types/type";

interface DifficultyFormProps {
    disabled?: boolean;
    defaultValue?: number;
}

const descriptions = ["매우 쉬움", "쉬움", "보통", "어려움", "매우 어려움"];
const DifficultyForm = ({ value, onChange, disabled, defaultValue = 1}: CustomFormItemProps & DifficultyFormProps) => {
  return (
    <Rate
      value={value}
      disabled={disabled}
      onChange={onChange}
      allowClear={false}
      tooltips={descriptions}
      defaultValue={defaultValue}
    />
  );
};

export default DifficultyForm;
