/**
 * 提示组件
 */
import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
// import classnames from 'classnames';

interface IProps
{
    message: string,
    type?: "success" | "error" | "loading",
    onclose?:()=>void
}

export default (message: string,type?: "success" | "error" | "loading") =>
{
    type = type ? type : 'success';
    // 释放组件
    const disposeNode = () =>
    {
        ReactDOM.unmountComponentAtNode(div);
        if (div.parentNode)
        {
            div.parentNode.removeChild(div);
        }
    };

    // 插入message提示的容器至body
    const div = document.createElement('div');
    document.body.appendChild(div);


    class Toast extends React.Component<IProps>
    {
        public onClose = () =>
        {
            setTimeout(() =>
            {
              disposeNode();
            }, 5000)
        }
        public close=()=>{
            disposeNode();
        }
        public render()
        {
            return (
                type==='loading'?     
                <div className="toast-warp">
                    <div className="comp-toast">
                        {this.onClose()}
                        <div className="img-box">
                            {
                                type === 'loading' && <div className="alert-loading-icon"><img src={require('@/img/loading.png')} /></div>
                            }
                        </div>
                        <span className="text" dangerouslySetInnerHTML={{ '__html': this.props.message }} />
                    </div >
                </div>
                :                
                <div className="comp-toast">
                    {this.onClose()}
                    <div className="img-box">
                        {
                            type === 'success' && <img src={require('@/img/yes.png')} className="alert-success-icon" />
                        }
                        {
                            type === 'error' && <img src={require('@/img/attention.png')} className="alert-success-icon" />
                        }
                    </div>
                    <span className="text" dangerouslySetInnerHTML={{ '__html': this.props.message }} />
                </div >                
            );
        }
    }

    // message
    const node = (
        <Toast message={message} />
    );

    // 渲染message
    ReactDOM.render(node, div);
}
