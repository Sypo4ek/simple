import React, { useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { ExceptComment, SearchProps, TComment, commentKeys } from '../../core';
import { SearchInput } from '../SearchInput/SearchInput';
import { Loading } from '../Loading/Loading';
import { Button } from '../Button/Button';

const paginationCount = 10;

type Comment = keyof ExceptComment;

type Sort = {
  _sort?: Comment;
  _order: 'asc' | 'desc';
};

const Wrapper = styled.div``;
const ErrorContent = styled.div``;
const TableContainer = styled.table`
  border-collapse: collapse;
  width: calc(100vw - 40px);
`;
const TableRowContent = styled.tr`
  border: 1px solid #959595;
  cursor: pointer;
`;

const TableBody = styled.tbody`
  height: 60vh;
`;

const TableFooter = styled.tfoot`
  height: 60px;
`;
const TableHeaderContent = styled.th<{ $order?: 'asc' | 'desc' }>`
  position: relative;
  padding: 8px 0px;
  text-align: center;
  min-width: 100px;
  width: 25%;
  &:first-child {
    width: 12%;
  }
  &:last-child {
    width: 12%;
  }

  // ${({ $order }) => css`
    //   &:after {
    //     transition-duration: 0.5s;
    //     position: absolute;
    //     content: '^';
    //     transform: rotate(${$order === 'desc' ? 180 : 0}deg);
    //     width: 20px;
    //   }
    //
  `}
`;
const TableDefualtContent = styled.td`
  padding: 8px 0px;
  text-align: center;
  min-width: 100px;
  width: 25%;
  line-height: 12px;
  &:first-child {
    width: 12%;
  }
  &:last-child {
    width: 12%;
  }
`;

type Props = {
  result: Array<TComment>;
  onFilter: (params?: SearchProps) => Promise<void>;
  isLoading?: boolean;
  errorMessage?: string;
};

export function Table({ result, onFilter, errorMessage, isLoading }: Props) {
  const [page, setPage] = useState(1);
  // const [sort, setSort] = useState<Sort>({
  //   _sort: undefined,
  //   _order: 'asc',
  // });
  const navigate = useNavigate();
  const handleClick = (item: TComment) => {
    navigate('/comment/' + item.id);
  };

  // const handleSortList = (item: Comment) => {
  //   setSort((prev) => {
  //     let sort: Sort = {
  //       _sort: item,
  //       _order:
  //         prev._sort !== item ? 'desc' : prev._order === 'asc' ? 'desc' : 'asc',
  //     };

  //     onFilter([
  //       { key: '_sort', value: sort._sort },
  //       {
  //         key: '_order',
  //         value: sort._order,
  //       },
  //     ]);

  //     return sort;
  //   });
  // };

  const currentResult = useMemo(() => {
    const startPage = page === 1 ? page - 1 : (page - 1) * paginationCount;
    return result.slice(startPage, startPage + paginationCount);
  }, [result, page]);

  const handlePrevPage = () => {
    setPage((prev) => prev - 1);
  };
  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <Wrapper>
      <SearchInput onClick={onFilter} />

      {errorMessage ? (
        <ErrorContent>{errorMessage}</ErrorContent>
      ) : (
        <TableContainer>
          <thead>
            <TableRowContent>
              {commentKeys.map((name, index) => (
                <TableHeaderContent
                  key={name + index}
                  // Сортировка, которая не связана с построением апи по фильтрации
                  // #лень
                  // onClick={() => handleSortList(name)}
                  // $order={sort._sort === name ? sort._order : 'asc'}
                >
                  {name.charAt(0).toUpperCase() + name.substring(1)}
                </TableHeaderContent>
              ))}
            </TableRowContent>
          </thead>

          <TableBody>
            {isLoading ? (
              <Loading isTable />
            ) : (
              currentResult.map((item, index) => (
                <TableRowContent
                  key={item.id + index + item.body}
                  onClick={() => handleClick(item)}
                >
                  {commentKeys.map((key) => (
                    <TableDefualtContent
                      key={item.id + index + item.body + key + item[key]}
                    >
                      {item[key]}
                    </TableDefualtContent>
                  ))}
                </TableRowContent>
              ))
            )}
          </TableBody>
          <TableFooter>
            <tr>
              <td colSpan={2} align="left">
                <Button
                  text="Назад"
                  onClick={handlePrevPage}
                  disabled={page === 1}
                />
              </td>
              <td colSpan={3} align="right">
                <Button
                  text="Вперед"
                  onClick={handleNextPage}
                  disabled={page >= result.length / paginationCount}
                />
              </td>
            </tr>
          </TableFooter>
        </TableContainer>
      )}
    </Wrapper>
  );
}
