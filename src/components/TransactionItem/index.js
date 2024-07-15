import './index.css'

const TransactionItem = props => {
  const {details, onClickDeleteBtn} = props
  const {id, title, amount, type} = details
  const onDeleteTransactionItem = () => {
    onClickDeleteBtn(id)
  }
  return (
    <div className="each-transaction-Item-container">
      <p className="li">{title}</p>
      <p className="li">{amount}</p>
      <p className="li">{type}</p>
      <li className="li">
        <button className="delete-btn" onClick={onDeleteTransactionItem} type="button">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </li>
    </div>
  )
}

export default TransactionItem
