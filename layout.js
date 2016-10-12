const { html } = require('inu')
const { navigate } = require('inux')

module.exports = (render) => (params, model, dispatch) => {
  return html`
    <main>
      <div class="row align-justify top-bar expanded light-gray">
        <button id="home-icon" class="small-2 columns" onclick=${() => dispatch(navigate('/'))}>
          <img src="/logo-02.svg" alt="Enspiral Dev Academy Logo"> 
        </button> 
        <button class="column small-2" id="login" onclick=${() => dispatch(navigate('/login'))}>
          <i class="fi-torso"></i>
        </button>
      </div>
      <div id="menubar" class="top-bar expanded">
        <div class="row column text-center">
        </div>
      </div>
      <div class="row columns">
        ${render(params, model, dispatch)}
      </div> 
      <footer>
        <div class="row expanded align-spaced">
          <div class="small-3 small-offset-9 medium-1 medium-offset-11 small-collapse columns">
            <img src="/logo-04.svg" alt="Enspiral Dev Academy Logo"> 
          </div> 
        </div> 
      </footer>
    </main>
`
}
