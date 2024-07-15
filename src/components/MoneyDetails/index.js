import './index.css'

import {v4 as uuidv4} from 'uuid'

const MoneyDetails = props => {
  const {transactionTypeOptionsDetails, income, expenses, balance} = props
  const moneyDetails = [
    {
      id: uuidv4(),
      imgSrc:
        'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
      altText: 'balance',
      label: 'Your Balance',
      amount: balance,
      className: 'balance-container',
      testid: 'balanceAmount',
    },
    {
      id: uuidv4(),
      imgSrc:
        'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
      altText: 'income',
      label: `Your ${transactionTypeOptionsDetails[0].displayText}`,
      amount: income,
      className: 'balance-container income',
      testid: 'incomeAmount',
    },
    {
      id: uuidv4(),
      imgSrc:
        'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
      altText: 'expenses',
      label: `Your ${transactionTypeOptionsDetails[1].displayText}`,
      amount: expenses,
      className: 'balance-container expenses',
      testid: 'expensesAmount',
    },
  ]
  return (
    <div className="money-details-container">
      {moneyDetails.map(detail => (
        <div className={detail.className} key={detail.id}>
          <img
            src={detail.imgSrc}
            alt={detail.imgSrc}
            className="balance-img"
          />
          <div className="name-and-amount-container">
            <p className="your-balance">{detail.label}</p>
            <p className="amount-in-rs" data-testid={detail.testid}>
              Rs {detail.amount}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MoneyDetails
