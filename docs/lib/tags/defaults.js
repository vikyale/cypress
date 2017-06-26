const rawRender = require('../raw_render')

module.exports = function yields (hexo, args) {
  // {% defaults none cy.clearCookies %}
  // {% defaults blurability .blur %}
  // {% defaults focusability .blur %}
  // {% defaults checkability .click %}
  // {% defaults actionability .click %}
  // {% defaults existence .children %}

  const type = args[0]
  const cmd = `<code>${args[1]}()</code>`

  /* eslint-disable quotes */
  const actionable = `${cmd} requires the element to be in an {% url 'actionable state' interacting-with-elements %}`

  /* eslint-disable quotes */
  const exist = `${cmd} requires the element(s) to be {% url 'found in the dom' introduction-to-cypress#Default-Assertions %}`

  const focus = `${cmd} requires the element to be able to receive focus`

  const render = (str) => {
    return rawRender.call(this, hexo, str)
  }

  const none = () => {
    return `<ul>
      <li><p>${cmd} has no requirements or default assertions.</p></li>
    </ul>`
  }

  const actionability = () => {
    return render(`<ul>
      <li><p>${actionable}.</p></li>
    </ul>`)
  }

  const blurability = () => {
    return `<ul>
      <li><p>${cmd} requires the element to currently have focus.</p></li>
      <li><p>${focus}.</p></li>
    </ul>`
  }

  const focusability = () => {
    return `<ul>
      <li><p>${focus}.</p></li>
    </ul>`
  }

  const checkability = () => {
    return render(`<ul>
      <li><p>${cmd} requires the element to have type <code>checkbox</code> or <code>radio</code>.</p></li>
      <li><p>${actionable}.</p></li>
    </ul>`)
  }

  const existence = () => {
    return render(`<ul>
      <li><p>${exist}.</p></li>
    </ul>`)
  }

  const exec = () => {
    return render(`<ul>
      <li><p>${cmd} requires the executed system command to eventually exit.</p></li>
    </ul>`)
  }

  const execCode = () => {
    return `<ul>
      <li><p>${cmd} requires that the exit code be <code>0</code>.</p></li>
    </ul>`
  }

  switch (type) {
    case 'none':
      return none()
    case 'actionability':
      return actionability()
    case 'blurability':
      return blurability()
    case 'focusability':
      return focusability()
    case 'checkability':
      return checkability()
    case 'existence':
      return existence()
    case 'exec':
      return exec()
    case 'exec_code':
      return execCode()
    default:
      // error when an invalid usage option was provided
      throw new Error(`{% defaults %} tag helper was provided an invalid option: ${type}`)
  }
}
