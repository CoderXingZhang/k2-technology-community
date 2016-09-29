import React from 'react'
import './NewForm.scss'
import TinyMCE from 'react-tinymce'
// import 'tinymce'
import { Link } from 'react-router'

type Props = {
  publish: Function,
  cb: String
};

export class NewForm extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.handleEditorChange = this.handleEditorChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      content: ''
    }
  }

  handleEditorChange (e) {
    this.state.content = e.target.getContent()
  }

  handleSubmit () {
    this.props.publish(this.refs.title.value, this.state.content, this.refs.author.value)
  }

  componentDidUpdate () {
    if (this.props.cb.cb === 'success') {
      this.props.cb.cb = ''
      window.location.href = '/'
    }
  }

  render () {
    return (
      <div>
        <section className='new-title'>
          <input ref='title' className='new-title-input' placeholder='标题' />
        </section>
        <section className='new-wysiwyg-editor'>
          <input name='image' type='file' id='upload' style={{ 'display': 'none' }} />
          <TinyMCE
            content={this.state.content}
            config={{
              height: '400',
              paste_data_images: true,
              plugins: [ 'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen textcolor colorpicker',
                'insertdatetime media table contextmenu paste code'],
              toolbar: 'insertfile undo redo | styleselect fontselect | bold italic | forecolor backcolor | alignleft' +
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
          <h4>发帖人</h4>
          <input ref='author' className='new-input' />
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
