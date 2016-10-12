import React from 'react'
import './NewForm.scss'
import TinyMCE from 'react-tinymce'
import Tags from 'components/Tags'
import { Link } from 'react-router'
import localStorage from 'localforage'
const dataHost = __DATAHOST__

type Props = {
  publish: Function,
  new: String
};

export class NewForm extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.handleEditorChange = this.handleEditorChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTags = this.handleTags.bind(this)
    this.handleChange = this.handleChange.bind(this)
    // this.loadTinyMCEToRender = this.loadTinyMCEToRender.bind(this)
    this.state = {
      content: '',
      tags: [],
      data: []
    }
  }

  handleEditorChange (e) {
    this.state.content = e.target.getContent()
    localStorage.setItem('draft', JSON.stringify({
      title: this.refs.title.value,
      content: this.state.content,
      tags: this.state.tags,
      author: this.refs.author.value
    }))
  }

  handleChange () {
    localStorage.setItem('draft', JSON.stringify({
      title: this.refs.title.value,
      content: this.state.content,
      tags: this.state.tags,
      author: this.refs.author.value
    }))
  }

  handleSubmit () {
    this.props.publish(this.refs.title.value, this.state.content, this.refs.author.value,
      this.state.tags, this.state.data)
  }

  handleTags (newTags) {
    this.setState({ tags: newTags })
  }

  componentDidUpdate () {
    if (this.props.new.cb === 'success') {
      this.props.new.cb = ''
      document.getElementById('Home').click()
    }
  }

  componentWillMount () {
    localStorage.getItem('draft', (err, value) => {
      value = JSON.parse(value)
      this.state.content = value.content
      this.state.tags = value.tags
      this.refs.title.value = value.title
      this.refs.author.value = value.author
      err && console.log(err)
    })
  }

  componentDidMount () {
    window.setTimeout(() => {
      fetch(`${dataHost}/tags/_search`)
      .then(function (res) {
        if (res.status >= 400) { throw new Error('Put fail') }
        return res.json()
      })
      .then((json) => {
        this.setState({ data: json.hits.hits })
      })
    }, 1000)
  }

  // componentDidMount () {
    // console.log(window, this.refs.newWysiwygEditor)
    // this.refs.newWysiwygEditor.addEventListener('resize', () => { console.log('reseize') })
    // window.addEventListener('resize', () => { console.log('reseize') })
  // }

  render () {
    return (
      <div>
        <section className='new-title'>
          <input ref='title' className='new-title-input' placeholder='标题' onChange={this.handleChange} />
        </section>
        <section ref='newWysiwygEditor' className='new-wysiwyg-editor'>
          <input name='image' type='file' id='upload' style={{ 'display': 'none' }} />
          <TinyMCE
            ref='tinymce'
            content={this.state.content}
            config={{
              height: '350',
              paste_data_images: true,
              content_style: 'div, p { font-size: 14px; }',
              fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 20pt 26pt 36pt',
              plugins: [ 'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen textcolor colorpicker',
                'insertdatetime media table contextmenu paste code'],
              toolbar: 'insertfile undo redo | styleselect fontselect | fontsizeselect ' +
                '| bold italic | forecolor backcolor | alignleft' +
                ' aligncenter alignright alignjustify | bullist numlist outdent indent | link image | fullscreen',
              image_advtab: true,
              file_picker_callback: function (callback, value, meta) {
                if (meta.filetype === 'image') {
                  document.getElementById('upload').click()
                  document.getElementById('upload').addEventListener('change', function () {
                    var file = this.files[0]
                    var reader = new FileReader()
                    reader.onload = function (e) {
                      callback(e.target.result, { alt: '' })
                    }
                    reader.readAsDataURL(file)
                  }, false)
                }
              }
            }}
            onChange={this.handleEditorChange} />
        </section>
        <section className='new-other-info'>
          <h4>标签</h4>
          <Tags data={this.state.data} tags={this.state.tags} handleTags={this.handleTags} />
          <h4>发帖人</h4>
          <input ref='author' className='new-input' onChange={this.handleChange} />
        </section>
        <section className='new-btns-container'>
          <button className='new-submit-btn' onClick={this.handleSubmit}>发帖</button>
          <Link to='/'>
            <button ref='cancel' className='new-cancel-btn'>取消</button>
          </Link>
        </section>
      </div>
    )
  }
}

export default NewForm
