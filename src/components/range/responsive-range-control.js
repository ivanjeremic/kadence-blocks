/**
 * Responsive Range Component
 *
 */
/**
 * Internal block libraries
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import map from 'lodash/map';
import isEqual from 'lodash/isEqual';
import { undo } from '@wordpress/icons';
import capitalizeFirstLetter from './../common/capitalfirst';
import ResponsiveSingleRangeControl from './single-range-control';
import {
	Dashicon,
	Button,
	ButtonGroup,
} from '@wordpress/components';

/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
export default function ResponsiveRangeControls( {
	label,
	onChange,
	onChangeTablet,
	onChangeMobile,
	mobileValue,
	tabletValue,
	value,
	step = 1,
	max = 100,
	min = 0,
	unit = '',
	onUnit,
	showUnit = false,
	units = [ 'px', 'em', 'rem' ],
	allowEmpty = true,
	className = '',
	reset,
} ) {
	const [ deviceType, setDeviceType ] = useState( 'Desktop' );
	let customSetPreviewDeviceType = ( device ) => {
		setDeviceType( capitalizeFirstLetter( device ) );
	};
	if ( wp.data.select( 'core/edit-post' ) ) {
		const theDevice = useSelect( ( select ) => {
			const {
				__experimentalGetPreviewDeviceType = null,
			} = select( 'core/edit-post' );
			return __experimentalGetPreviewDeviceType ? __experimentalGetPreviewDeviceType() : 'Desktop';
		}, [] );
		if ( theDevice !== deviceType ) {
			setDeviceType( theDevice );
		}
		const {
			__experimentalSetPreviewDeviceType = null,
		} = useDispatch( 'core/edit-post' );
		customSetPreviewDeviceType = ( device ) => {
			__experimentalSetPreviewDeviceType( capitalizeFirstLetter( device ) );
			setDeviceType( capitalizeFirstLetter( device ) );
		};
	}
	const devices = [
		{
			name: 'Desktop',
			key: 'desktop',
			title: <Dashicon icon="desktop" />,
			itemClass: 'kb-desk-tab',
		},
		{
			name: 'Tablet',
			key: 'tablet',
			title: <Dashicon icon="tablet" />,
			itemClass: 'kb-tablet-tab',
		},
		{
			name: 'Mobile',
			key: 'mobile',
			title: <Dashicon icon="smartphone" />,
			itemClass: 'kb-mobile-tab',
		},
	];
	const output = {};
	output.Mobile = (
		<ResponsiveSingleRangeControl
			device={ 'mobile' }
			value={ ( undefined !== mobileValue ? mobileValue : '' ) }
			onChange={ ( size ) => onChangeMobile( size ) }
			min={ min }
			max={ max }
			step={ step }
			unit={ unit }
			onUnit={ onUnit }
			showUnit={ showUnit }
			units={ units }
		/>
	);
	output.Tablet = (
		<ResponsiveSingleRangeControl
			device={ 'tablet' }
			value={ ( undefined !== tabletValue ? tabletValue : '' ) }
			onChange={ ( size ) => onChangeTablet( size ) }
			min={ min }
			max={ max }
			step={ step }
			unit={ unit }
			onUnit={ onUnit }
			showUnit={ showUnit }
			units={ units }
		/>
	);
	output.Desktop = (
		<ResponsiveSingleRangeControl
			device={ 'desktop' }
			value={ ( undefined !== value ? value : '' ) }
			onChange={ ( size ) => onChange( size ) }
			min={ min }
			max={ max }
			step={ step }
			unit={ unit }
			onUnit={ onUnit }
			showUnit={ showUnit }
			units={ units }
		/>
	);
	return [
		onChange && onChangeTablet && onChangeMobile && (
			<div className={ `components-base-control kb-responsive-range-control${ '' !== className ? ' ' + className : '' }` }>
				<div className="kadence-title-bar">
					{ reset && (
						<Button
							className="is-reset is-single"
							isSmall
							disabled={ ( ( isEqual( '', value ) ) ? true : false ) }
							icon={ undo }
							onClick={ () => reset() }
						></Button>
					) }
					{ label && (
						<span className="kadence-control-title">{ label }</span>
					) }
					<ButtonGroup className="kb-measure-responsive-options" aria-label={ __( 'Device', 'kadence-blocks' ) }>
						{ map( devices, ( { name, key, title, itemClass } ) => (
							<Button
								key={ key }
								className={ `kb-responsive-btn ${ itemClass }${ name === deviceType ? ' is-active' : '' }` }
								isSmall
								aria-pressed={ deviceType === name }
								onClick={ () => customSetPreviewDeviceType( name ) }
							>
								{ title }
							</Button>
						) ) }
					</ButtonGroup>
				</div>
				{ ( output[ deviceType ] ? output[ deviceType ] : output.Desktop ) }
			</div>
		),
	];
}
