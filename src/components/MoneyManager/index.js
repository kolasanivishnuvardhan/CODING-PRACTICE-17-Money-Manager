import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import TransactionItem from '../TransactionItem'

import MoneyDetails from '../MoneyDetails'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const initialHistory = []

class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    type: 'Income',
    history: initialHistory,
    income: 0,
    balance: 0,
    expenses: 0,
  }

  onClickAddBtn = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    const id = uuidv4()
    const newTransaction = {
      id,
      title,
      amount: parseInt(amount),
      type,
    }

    this.setState(prevState => {
      let {income, balance, expenses} = prevState

      if (type === 'Income') {
        income += parseInt(amount)
        balance += parseInt(amount)
      } else {
        expenses += parseInt(amount)
        balance -= parseInt(amount)
      }
      return {
        history: [...prevState.history, newTransaction],
        title: '',
        amount: '',
        income,
        expenses,
        balance,
      }
    })
  }

  onClickDeleteBtn = id => {
    const {
      history,
      income: currentIncome,
      balance: currentBalance,
      expenses: currentExpenses,
    } = this.state
    const index = history.findIndex(
      eachTransaction => eachTransaction.id === id,
    )
    const transactionItem = history[index]
    const {type, amount} = transactionItem
    const parsedAmount = parseInt(amount, 10)

    let income = currentIncome
    let balance = currentBalance
    let expenses = currentExpenses
    if (type === 'Income') {
      income -= parsedAmount
      balance -= parsedAmount
    } else {
      expenses -= parsedAmount
      balance += parsedAmount
    }

    this.setState(prevState => ({
      history: prevState.history.filter(
        eachTransaction => eachTransaction.id !== id,
      ),
      income,
      balance,
      expenses,
    }))
  }

  onChangeTitleInput = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amount: event.target.value})
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  render() {
    const {title, amount, history, income, expenses, balance,type} = this.state
    return (
      <div className="bg-container">
        <div className="welcome-container">
          <h1 className="name">Hi, Richard</h1>
          <p className="description">
            Welcome back to your <span className="span">Money Manager</span>
          </p>
        </div>

        <MoneyDetails
          transactionTypeOptionsDetails={transactionTypeOptions}
          expenses={expenses}
          income={income}
          balance={balance}
        />

        <div className="transaction-container">
          <div className="add-transaction-container">
            <h1 className="add-transaction-container-heading">
              Add Transaction
            </h1>
            <form>
              <label htmlFor="title" className="label-title">
                TITLE
              </label>
              <br />
              <input
                type="text"
                placeholder="TITLE"
                className="input-title"
                value={title}
                id="title"
                onChange={this.onChangeTitleInput}
              />
              <br />

              <label htmlFor="amount" className="label-title">
                AMOUNT
              </label>
              <br />
              <input
                type="text"
                placeholder="AMOUNT"
                className="input-title"
                id="amount"
                value={amount}
                onChange={this.onChangeAmountInput}
              />

              <br />

              <label htmlFor="type" className="label-title">
                TYPE
              </label>
              <br />
              <select
                id="type"
                name="type-of-money"
                className="select-type"
                onChange={this.onChangeType}
                value={type}
              >
                <option value="INCOME">Income</option>
                <option value="EXPENSES">Expenses</option>
              </select>

              <br />

              <button
                className="add-btn"
                type="submit"
                onClick={this.onClickAddBtn}
              >
                Add
              </button>
            </form>
          </div>
          <div className="history-container">
            <h1 className="history-container-heading">History</h1>
            <ul className="ul">
              <p className="li">Title</p>
              <p className="li">Amount</p>
              <p className="li">Type</p>
              <li className="li"></li>
            </ul>
            <ul className="transaction-item-container">
              {history.map(eachTransaction => (
                <TransactionItem
                  details={eachTransaction}
                  onClickDeleteBtn={this.onClickDeleteBtn}
                  key={eachTransaction.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
