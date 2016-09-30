import React from 'react'
import './LiteEditor.scss'
import TinyMCE from 'react-tinymce'

type Props = {
  id: String,
  cb: String,
  to: String,
  reply: Function,
  cancel: Function
};
export class LiteEditor extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.handleEditorChange = this.handleEditorChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.state = {
      content: ''
    }
  }

  handleCancel () {
    this.props.cancel()
  }

  handleEditorChange (e) {
    this.state.content = e.target.getContent()
  }

  handleSubmit () {
    this.props.reply(this.props.id, this.refs.author.value, this.state.content, this.props.to)
  }

  render () {
    return (
      <div>
        <section className='lite-editor-reply-to'>回复 {this.props.to}</section>
        <section className='reply-wysiwyg-editor'>
          <TinyMCE
            content={this.state.content}
            config={{
              height: '200',
              plugins: [ 'advlist autolink lists link charmap print preview anchor',
                'searchreplace visualblocks code fullscreen textcolor colorpicker',
                'insertdatetime media table contextmenu paste code'],
              toolbar: 'insertfile undo redo | styleselect fontselect | bold italic | forecolor backcolor | alignleft' +
                ' aligncenter alignright alignjustify | bullist numlist outdent indent | link | fullscreen'
            }}
            onChange={this.handleEditorChange} />
        </section>
        <section className='reply-other-info'>
          <h6>姓名 </h6>
          <input ref='author' className='reply-input' />
        </section>
        <section className='reply-btns-container'>
          <button className='reply-submit-btn' onClick={this.handleSubmit}>添加回复</button>
          <button className='reply-cancel-btn' onClick={this.handleCancel}>取消</button>
        </section>
      </div>
    )
  }
}

export default LiteEditor
