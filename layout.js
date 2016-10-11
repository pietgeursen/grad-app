const { html } = require('inu')
const { navigate } = require('inux')

module.exports = (render) => (params, model, dispatch) => {
  return html`
    <main>
          <ul class="menu row align-justify">
            <div class="small-2 columns" onclick=${() => dispatch(navigate('/'))}>
              <img src="/logo-02.svg" alt="Enspiral Dev Academy Logo"> 
            </div> 
            <li class="small columns"></li>
            <button class="column small-2" id="login" onclick=${() => dispatch(navigate('/login'))}>
              <i class="fi-torso"></i>
            </button>
          </ul>
    <div class="callout primary">
      <div class="row column text-center">
        <h1>Our Graduates</h1>
      </div>
    </div>
      ${render(params, model, dispatch)}
      <footer>
        <div class="row expanded align-spaced">
          <div class="small-6 columns"></div>
          <div class="small-2 columns">
            <img src="/logo-04.svg" alt="Enspiral Dev Academy Logo"> 
          </div> 
          <div class="small-1 hide-for-large columns"></div> 
        </div> 
      </footer>
    </main>
`
}
