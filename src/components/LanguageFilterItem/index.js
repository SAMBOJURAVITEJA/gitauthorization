import './index.css'

const LanguageFilterItem = props => {
  const {each, filtering, valid} = props
  const {language, id} = each
  const change = () => {
    filtering(id)
  }

  const addingButton = valid ? 'btn' : null

  return (
    <li id="list-items2" onClick={change}>
      <button type="button" className={addingButton}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
