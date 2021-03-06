import React, { useState } from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses'
const numberOfExpensesToShow = 10;

export const ExpenseList = ({ expenses, dictionary, locale }) => {

  const [offset, setOffset] = useState(numberOfExpensesToShow);

  const expensesToShow = expenses.slice(0, offset);
  const shouldRenderLoadMoreButton = expenses.length > offset;

  return (
    <div className="content-container">
      <div className="list-header">
        <div >{dictionary.tableExpense}</div>
        <div >{dictionary.tableAmount}</div>
      </div>
      <div className="list-body">
        {
          expensesToShow.length == 0 ? (
            <div className="list-item-message">
              <span>{dictionary.noExpenseMessage}</span>
            </div>
          ) : (
            expensesToShow.map((expense) => {
                return <ExpenseListItem key={expense.id} dictonary={dictionary} {...expense} locale={locale} />
              })
            )
        }

      {shouldRenderLoadMoreButton && <button className="button" style={{width: '100%', marginTop: '10px'}} onClick={() => setOffset(offset+numberOfExpensesToShow)}>{dictionary.buttons.loadMore}</button>}
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses.present, state.filters),
    dictionary: state.lang.dictionary,
    locale: state.lang.locale,
  };
};

export default connect(mapStateToProps)(ExpenseList);
