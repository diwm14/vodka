import { AutoComplete, Input, Spin } from "antd";
import debounce from "lodash/debounce";
import React, { Dispatch, useMemo, useRef, useState } from "react";
import { getBoardgamesApi } from "../../api/webApi";
import { BoardlifeBoardgame, CustomFormItemProps } from "../../types/type";
import BoardgameCard from "./BoardgameCard";

interface Option {
  label: JSX.Element;
  value: string;
  data: BoardlifeBoardgame;
}

interface BoardgameSearchBoxProps {
    setGameInfo: Dispatch<React.SetStateAction<BoardlifeBoardgame | undefined>>
}


const BoardgameSearchBox = ({value, onChange, setGameInfo}: CustomFormItemProps & BoardgameSearchBoxProps) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [fetching, setFetching] = useState(false);
  const [query, setQuery] = useState("");
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      getBoardgamesApi(value).then((res) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(
          res.map((bg) => ({
            label: <BoardgameCard boardgame={bg} />,
            value: bg.title,
            data: bg,
          }))
        );
        setFetching(false);
      });
    };

    return debounce(loadOptions, 200);
  }, [query]);

  const onSelect = (value: any, option: any) => {
    // console.log(value);
    // console.log(option);
    setGameInfo(option.data)
  };

  const handleSearch = (value: string) => {
    if (!value) return;
    setQuery(value);
    debounceFetcher(value);
  };

  return (
    <AutoComplete
      value={value}
      onChange={onChange}
      filterOption={false}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
      notFoundContent={fetching ? <Spin size="middle" /> : null}
    >
      <Input.Search size="large" placeholder="보드게임 검색" enterButton />
    </AutoComplete>
  );
};

export default BoardgameSearchBox;
