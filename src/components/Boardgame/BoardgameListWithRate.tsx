import { List, Input, Select } from "antd";
import React, { useState, useEffect } from "react";
import useBoardgame from "../../hooks/useBoardgame";
import BoardgameWithRate from "./BoardgameWithRate";

// 중복이지만 이 악물고 export/impmort 안하기 
const rateDescriptions = ["아쉬워요","살짝 아쉬워요","재밌음","너무 재밌어요","꼭 해야해요",];
const difficultyDescriptions = ["매우 쉬움","쉬움","보통","어려움","매우 어려움"];

interface Filter {
    title?: string,
    rate?: string[],
    difficulty?: string[]
}

const BoardgameListWithRate = () => {
  const { commentWithGroup } = useBoardgame();

  const [filter, setFilter] = useState<Filter>({});
  const [query, setQuery] = useState("");
  const [filteredDatasource, setFilteredDatasource] = useState();

  useEffect(() => {
    if (commentWithGroup) {
      setFilteredDatasource(
        commentWithGroup.filter((cwg: any) => cwg.title.includes(query))
      );
    }
  }, [commentWithGroup, query]);
  const onChange = (event: any) => {
    setFilter({...filter, title: event.target.value})  
    setQuery(event.target.value);
  };

  const onDifficultyFilterChange = (value: string[]) => {
    console.log(value);
    setFilter({...filter, difficulty: value})  
  };
  const onRateFilterChange = (value: string[]) => {
    console.log(value);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Input.Search
          placeholder="보드게임명 검색"
          allowClear
          enterButton="Search"
          size="large"
          onChange={onChange}
          style={{ width: "300px" }}
        />
{/* 
        <Select
          mode="tags"
          size="large"
          style={{ width: "300px", marginLeft: '20px' }}
          maxTagCount="responsive"
          allowClear
          placeholder="평가"
          onChange={onRateFilterChange}
        >
            {rateDescriptions.map((desc, index) => <Select.Option key={index+1}>{desc}</Select.Option>)}
        </Select>

        <Select
          mode="tags"
          size="large"
          style={{ width: "300px", marginLeft: '20px' }}
          maxTagCount="responsive"
          allowClear
          placeholder="난이도"
          onChange={onDifficultyFilterChange}
        >
            {difficultyDescriptions.map((desc, index) => <Select.Option key={index+1}>{desc}</Select.Option>)}
        </Select> */}
      </div>
      <List
        style={{ backgroundColor: "white" }}
        bordered={true}
        itemLayout="vertical"
        size="small"
        pagination={{
          showTotal: (total: number) => `Total ${total} items`,
          pageSize: 5,
        }}
        dataSource={filteredDatasource as any[]}
        renderItem={(item) => <BoardgameWithRate item={item} />}
      />
    </div>
  );
};

export default BoardgameListWithRate;
