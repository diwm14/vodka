import React from "react";
import { Rate } from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { CustomFormItemProps } from "../../types/type";


const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};
const descriptions = [
  "아쉬워요",
  "살짝 아쉬워요",
  "재밌음",
  "너무 재밌어요",
  "꼭 해야해요",
];

interface RateFormProps {
    disabled?: boolean;
    defaultValue?: number;
}

const RateForm = ({ value, onChange, disabled, defaultValue = 3 }: CustomFormItemProps & RateFormProps) => {
  return (
    <Rate
      value={value}
      disabled={disabled}
      onChange={onChange}
      allowClear={false}
      defaultValue={defaultValue}
      tooltips={descriptions}
      character={({ index }: { index: number }) => customIcons[index + 1]}
    />
  );
};

export default RateForm;
