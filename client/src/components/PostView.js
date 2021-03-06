import React, {Component} from "react";
import Model from "../models.js"
import { List, Card, Icon, Divider } from "antd";
import { Editor } from '../editor'
class PostView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            loading: true
        }

        // create ref for prosemirror div
        this.editorDiv = React.createRef();
        this.titleEditorDiv = React.createRef();
    }

    componentWillMount() {
        var self = this;
        Model.loadPost(this.props.match.params.username, this.props.match.params.postslug).then(() => {
            this.setState({post: Model.currentDoc, loading: false})
            var editorDiv = this.editorDiv.current;
            var titleEditorDiv = this.titleEditorDiv.current;
            window.editor = Editor.init(editorDiv, {
                post: this.state.post,  
                editable: false
            })
            window.titleEditor = Editor.initTitleEditor(titleEditorDiv, {
                post: this.state.post,
                editable: false
            })
        }).catch(resp => {

        })
    }

    render() {
        if (this.state.post.fields) {
            return (
                <Card className="writango-post-container" style={{minHeight: '100vh', border: '0', width: '800px', margin: 'auto'}}>
                <div className="prosemirror-title-div" ref={this.titleEditorDiv}>
                </div>
                {/* <h1>{this.state.post.fields.title}</h1> */}
                <div className="post-body">
                    <div className="prosemirror-div" ref={this.editorDiv}>
                    </div>
                </div>
                </Card>
            )
        } else if (this.state.loading) {
            return (
                <div style={{minHeight: '100vh'}}></div>
            )
        }
        return (
            <div style={{minHeight: '100vh', width: '800px', margin: 'auto'}}>
                <p>
                    Sorry, either the requested post doesn't exist or you don't have necessary permissions to view the content.
                </p>
            </div>
        )
    }
}

export default PostView;