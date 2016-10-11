const { html } = require('inu')


const details = (params, model, dispatch) => {
  return html `
    ${model.user.get('loggedIn') ? html`
     <div> Hi ${model.user.getIn(['user', 'email'])}</div> 
    ` : null}
  `
}

module.exports = details
