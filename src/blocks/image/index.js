/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import itemicons from '../../icons';

import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';
import deprecated from './deprecated';
const { name } = metadata;

export { metadata, name };

export const settings = {
	example: {
		attributes: {
			sizeSlug: 'large',
			url: 'https://s.w.org/images/core/5.3/MtBlanc1.jpg',
			// translators: Caption accompanying an image of the Mont Blanc, which serves as an example for the Image block.
			caption: __( 'Mont Blanc appears—still, snowy, and serene.', 'kadence-blocks' ),
		},
	},
	__experimentalLabel( attributes, { context } ) {
		if ( context === 'accessibility' ) {
			const { caption, alt, url } = attributes;

			if ( ! url ) {
				return __( 'Empty' );
			}

			if ( ! alt ) {
				return caption || '';
			}

			// This is intended to be read by a screen reader.
			// A period simply means a pause, no need to translate it.
			return alt + ( caption ? '. ' + caption : '' );
		}
	},
	getEditWrapperProps( attributes ) {
		return {
			'data-align': attributes.align,
		};
	},
	transforms,
	edit,
	save,
	deprecated,
};

registerBlockType( 'kadence/image', {
	...metadata,
	icon: {
		src: itemicons.image,
	},
	...settings

});
