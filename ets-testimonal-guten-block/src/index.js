// src/index.js
const { registerBlockType } = wp.blocks;
import { useBlockProps, RichText, MediaUpload,  InnerBlocks } from '@wordpress/block-editor';

registerBlockType( 'myguten-block/custom-testimonal-block', {
    title: 'Custom Testimonal',
    icon: 'smiley',
    category: 'common',
    attributes: {
        author: {
            type: 'string',
            source: 'html',
            selector: 'p',
        },
        description: {
            type: 'string',
            source: 'html',
            selector: 'p',
        },
        imgUrl: {
            type: 'string',
        }
    },
    edit: (props) => {
        const {
            attributes: {author,description,imgUrl},
            setAttributes,
        } = props;
        const blockProps = useBlockProps();
        const onChangeContent = (newContent) => {
            setAttributes({ author: newContent });
        };
        const onChangeDescription = (newDescription) => {
            setAttributes({ description: newDescription });
        };

        const onImageSelect = (newImgUrl) => {
            setAttributes({ imgUrl: newImgUrl.sizes.full.url });
        };
        const ALLOWED_BLOCKS = [ 'core/buttons' ];
        return (
            <div className='ets_testimonal_section'>
                <div className='ets_testimonal'> 
                    <MediaUpload onSelect={onImageSelect}
                        render={
                        ({ open }) => {
                            return imgUrl ? <img onClick={open} src={imgUrl} /> : <button onClick={open}> Upload Image </button>
                            }
                        }
                        title="Insert Image"
                    /> 
                    <RichText {...blockProps}
                        tagName='h2'
                        onChange={onChangeContent}
                        placeholder='Author'
                        value={author} />

                    <RichText {...blockProps}
                        tagName='p'
                        onChange={onChangeDescription}
                        placeholder='Description'
                        value={description} />
                    <InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
                </div>
                <button>Add new</button>
            </div>
            
        )
        
    },
    save: (props) => {
        const blockProps = useBlockProps.save();
        return (
            <div className='ets_testimonal'>
                <img src={props.attributes.imgUrl} />
                <RichText.Content {...blockProps}
                    tagName='h5'
                    value={props.attributes.author} />
                    <RichText.Content {...blockProps}
                    tagName='p'
                    value={props.attributes.description} />
                 <InnerBlocks.Content />
            </div>
        )
    }
} );