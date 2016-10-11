const { html } = require('inu')
const { navigate } = require('inux')

module.exports = (render) => (params, model, dispatch) => {
  return html`
    <main>
      <div class="top-bar">
        <div class="top-bar-left">
          <ul class="menu">
            <li class="menu-text">Enspiral Dev Academy</li>
            <button id="login" onclick=${() => dispatch(navigate('/login'))}>
              <i class="fi-torso"></i>
            </button>
          </ul>
        </div>
      </div>
    <div class="callout primary">
      <div class="row column text-center">
        <h1>Our Graduates</h1>
      </div>
    </div>
      ${render(params, model, dispatch)}
      <footer>
        <div class="row">
          <div class="small columns"></div>
          <div class="small-2 columns">
            <img src="/logo-04.svg" alt="Enspiral Dev Academy Logo"> 
          </div> 
        </div> 
      </footer>
    </main>
`
}
