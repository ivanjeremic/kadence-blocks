/**
 * BLOCK: Kadence Theme Header
 */

/**
 * Import Icons
 */
import icons from '../../icons';
/**
 * Import Css
 */
// import './style.scss';
// import './editor.scss';

/**
 * Internal block libraries
 */
const { __, sprintf } = wp.i18n;
import { registerBlockType } from '@wordpress/blocks';
import ServerSideRender from '@wordpress/server-side-render';
import { useBlockProps } from '@wordpress/block-editor';
/**
 * Register: a Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'kadence/theme-header', {
	title: __( 'Theme Header', 'kadence-blocks' ),
	icon: {
		src: icons.blocktabs,
	},
	category: 'kadence-blocks',
	keywords: [
		__( 'header', 'kadence-blocks' ),
		__( 'theme', 'kadence-blocks' ),
		'KB',
	],
	supports: {
		anchor: true,
		align: [ 'wide', 'full' ],
	},
	edit: function ( props ) {
        const blockProps = useBlockProps();
        return (
            <div { ...blockProps }>
                <ServerSideRender
                    block="kadence/theme-header"
                    attributes={ props.attributes }
                />
            </div>
        );
    },
	save() {
		return null;
	},
} );
