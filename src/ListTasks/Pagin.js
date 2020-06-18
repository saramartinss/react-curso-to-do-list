import React from "react";
import Pagination from "react-bootstrap/Pagination";
import PropTypes from "prop-types";

function Pagin(props) {
  function generateFirstItem() {
    return (
      <Pagination.First
        key="pageFirst"
        onClick={() => props.changePage(1)}
        disabled={props.currentPage === 1}
      />
    );
  }

  function generatePrevItem() {
    return (
      <Pagination.Prev
        key="pagePrev"
        onClick={() => props.changePage(props.currentPage - 1)}
        disabled={props.currentPage === 1}
      />
    );
  }

  function generateNumericItems(page) {
    return (
      <Pagination.Item
        key={page}
        active={page === props.currentPage}
        onClick={() => props.changePage(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  function generateNextItem(numPages) {
    return (
      <Pagination.Next
        key="pageNext"
        onClick={() => props.changePage(props.changePage + 1)}
        disabled={props.currentPage === numPages}
      />
    );
  }

  function generateLastItem(numPages) {
    return (
      <Pagination.Last
        key="pageLast"
        onClick={() => props.changePage(numPages)}
        disabled={props.currentPage === numPages}
      />
    );
  }

  function getPagination() {
    const numPages = Math.ceil(props.totalItems / props.itemsPerPage);
    let items = [];

    items.push(generateFirstItem());
    items.push(generatePrevItem());
    for (let page = 1; page <= numPages; page++) {
      items.push(generateNumericItems(page));
    }
    items.push(generateNextItem(numPages));
    items.push(generateLastItem(numPages));

    return items;
  }

  return <Pagination data-testid="pagination">{getPagination()}</Pagination>;
}

Pagin.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default Pagin;
