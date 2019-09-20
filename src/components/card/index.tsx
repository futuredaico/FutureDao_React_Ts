/**
 * 按钮组件
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
// import { injectIntl } from 'react-intl';
import './index.less';
// import common from '@/store/common';

interface IProps
{
	style?: object,
    text: string,
    colortype:'c-purple'|'c-qpurple'|'c-green'|'c-red'|'c-gray'|'transparent-green'|'transparent-purple'|'transparent-red'|'transparent-gray'|'block-red'|'block-gray',
    cardsize?:'big-card'|'md-card'|'sm-card'|'md-sm-card',
}

@observer
export default class Card extends React.Component<IProps, {}> {
	constructor(props: IProps)
	{
		super(props);	
	}
	

	public render()
	{
		const btnClassName = classnames('normal-card',this.props.colortype,this.props.cardsize)
			// {
			// 	'button-group': !!!this.props.btnType ? true:false,
			// 	'blue-btn': this.props.btnType==='blue-btn' ? true: false,
			// 	'normal-blue': this.props.btnType==='normal-blue' ? true: false,
			// 	'disable-btn':this.props.disabled?this.props.disabled:false,
			// 	'en-btn':common.language === 'en'?true:false
			// })
		// this.props.smallbtn ? 'blue-btn' : 'button-group';
		
		return (
			<div className={btnClassName}
				style={this.props.style}
			>
				{this.props.text}
			</div>
		);
	}
}
