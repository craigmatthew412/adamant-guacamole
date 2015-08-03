/**
 * mlpushmenu.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
;( function( window ) {
	'use strict';

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	// taken from https://github.com/inuyaksa/jquery.nicescroll/blob/master/jquery.nicescroll.js
	function hasParent( e, id ) {
		if (!e) return false;
		var el = e.target||e.srcElement||e||false;
		while (el && el.id != id) {
			el = el.parentNode||false;
		}
		return (el!==false);
	}

	// returns the depth of the element "e" relative to element with id=id
	// for this calculation only parents with classname = waypoint are considered
	function getLevelDepth( e, id, waypoint, cnt ) {
		cnt = cnt || 0;
		if ( e.id.indexOf( id ) >= 0 ) return cnt;
		if( $(e).hasClass(waypoint) ) {
			++cnt;
		}
		return e.parentNode && getLevelDepth( e.parentNode, id, waypoint, cnt );
	}

	// returns the closest element to 'e' that has class "classname"
	function closest( e, classname ) {
		if( $(e).hasClass(classname) ) {
			return e;
		}
		return e.parentNode && closest( e.parentNode, classname );
	}

	function mlPushMenu( el, trigger, closerTrigger, options ) {
		this.el = el;
		this.trigger = trigger;
		this.closeTrigger = closerTrigger;
		this.options = extend( this.defaults, options );
		// support 3d transforms
		this.support = Modernizr.csstransforms3d;
		if( this.support ) {
			this._init();
		}
	}

	mlPushMenu.prototype = {
		defaults : {
			// overlap: there will be a gap between open levels
			// cover: the open levels will be on top of any previous open level
			type : 'overlap', // overlap || cover
			// space between each overlaped level
			levelSpacing : 40,
			// classname for the element (if any) that when clicked closes the current level
			backClass : 'nav-back'
		},
		_init : function() {
			// if menu is open or not
			this.open = false;
			// level depth
			this.level = 0;
			// the moving wrapper
			this.wrapper = document.getElementById( 'nav-pusher' );
			// the nav-level elements
			this.levels = Array.prototype.slice.call( this.el.querySelectorAll( 'div.nav-level' ) );
			// save the depth of each of these nav-level elements
			var self = this;
			// the menu items
			this.menuItems = Array.prototype.slice.call( this.el.querySelectorAll( 'li' ) );
			// the state links
			this.stateLinks = Array.prototype.slice.call( this.el.querySelectorAll( 'a[ui-sref]' ) );
			// if type == "cover" these will serve as hooks to move back to the previous level
			this.levelBack = Array.prototype.slice.call( this.el.querySelectorAll( '.' + this.options.backClass ) );
			//nav menu header back
			this.navMenuHeaderBack = this.el.querySelector('.nav-menu-header-back');
			// event type -- NOTE: FastClick has been implemented so click on mobile does not have 300ms delay
			this.eventtype = 'click';
			// add the class nav-overlap or nav-cover to the main element depending on options.type
			$(this.el).addClass('nav-' + this.options.type);
			// initialize / bind the necessary events
			this._initEvents();
		},
		_initEvents : function() {
			var self = this;

			// the menu should close if clicking somewhere on the body
			var bodyClickFn = function( el ) {
				self._resetMenu();
				el.removeEventListener( self.eventtype, bodyClickFn );
			};

			// open (or close) the menu
			this.trigger.addEventListener( this.eventtype, function( ev ) {
				ev.stopPropagation();
				ev.preventDefault();
				if( self.open ) {
					self._resetMenu();
				}
				else {
					self._openMenu();
					// the menu should close if clicking somewhere on the body (excluding clicks on the menu)
					document.addEventListener( self.eventtype, function( ev ) {
						if( self.open && !hasParent( ev.target, self.el.id ) ) {
							bodyClickFn( this );
						}
					} );
				}
			} );

			// close menu button
            this.closeTrigger.addEventListener( this.eventtype, function( ev ) {
                ev.stopPropagation();
                ev.preventDefault();
                if( self.open ) {
                    self._resetMenu();
                }
            } );

			this.navMenuHeaderBack.addEventListener( this.eventtype, function( ev ) {
				ev.preventDefault();
				ev.stopPropagation();
				self.level = ev.target.getAttribute( 'data-target' );
				self.level === 0 ? self._resetMenu() : self._closeMenu();
			} );

			// opening a state link
			this.stateLinks.forEach( function( el, i ) {
				el.addEventListener( self.eventtype, function( ev ) {
					//stop the event
					ev.stopPropagation();
					//close the menu
					self._resetMenu();
				} );
			} );

			// opening a sub level menu
			this.menuItems.forEach( function( el, i ) {
				//Query for a sub level
				var subLevel = el.querySelector( 'div.nav-level' );
				//Check if it has a sub level
				if( subLevel ) {
					el.querySelector( 'a' ).addEventListener( self.eventtype, function( ev ) {
						ev.preventDefault();
						var level = closest( el, 'nav-level' ).getAttribute( 'data-level' );
						if( self.level <= level ) {
							ev.stopPropagation();
							$(closest( el, 'nav-level' )).addClass('nav-level-overlay');
							self._openMenu( subLevel );
						}
					} );
				}
			} );

			// closing the sub levels :
			// by clicking on the visible part of the level element
			this.levels.forEach( function( el, i ) {
				el.addEventListener( self.eventtype, function( ev ) {
					ev.stopPropagation();
					var level = el.getAttribute( 'data-level' );
					if( self.level > level ) {
						self.level = level;
						self._closeMenu();
					}
				} );
			} );

			// by clicking on a specific element
			this.levelBack.forEach( function( el, i ) {
				el.addEventListener( self.eventtype, function( ev ) {
					ev.preventDefault();
					var target = el.getAttribute( 'data-target' );
					var level = closest( el, 'nav-level' ).getAttribute( 'data-level' );
					if( self.level <= level ) {
						ev.stopPropagation();
						//Find difference between current and target levels
						var difference = closest( el, 'nav-level' ).getAttribute( 'data-level' ) - target;
						//Set the new current level from the difference
						self.level = closest( el, 'nav-level' ).getAttribute( 'data-level' ) - difference;
						self.level === 0 ? self._resetMenu() : self._closeMenu();
					}
				} );
			} );
		},
		_openMenu : function( subLevel ) {
			// increment level depth
			++this.level;

			if(this.level > 1) {
				$(this.navMenuHeaderBack).addClass('nav-subcategory-opened');
			}

			// move the main wrapper
			var levelFactor = ( this.level - 1 ) * this.options.levelSpacing,
				translateVal = this.options.type === 'overlap' ? this.el.offsetWidth + levelFactor : this.el.offsetWidth;
			
			this._setTransform( 'translate3d(' + translateVal + 'px,0,0)' );

			if( subLevel ) {
				// reset transform for sublevel
				this._setTransform( '', subLevel );
				for( var i = 0, len = this.levels.length; i < len; ++i ) {
					var levelEl = this.levels[i];
					// need to reset the translate value for the level menus that have the same level depth and are not open
					if( levelEl != subLevel && !$(levelEl).hasClass('nav-level-open') ) {
						this._setTransform( 'translate3d(-100%,0,0) translate3d(' + -1*levelFactor + 'px,0,0)', levelEl );
					};
					// scroll opened levels back to top
					if(levelEl != subLevel && $(levelEl).hasClass('nav-level-open') && (levelEl.scrollTop > 0)) {
						$(levelEl).animate({
							scrollTop: 0
						}, 500);
					};
				}
			}
			// add class nav-pushed to main wrapper if opening the first time
			if( this.level === 1 ) {
				$(this.wrapper).addClass('nav-pushed');
				this.open = true;
			}
			// add class nav-level-open to the opening level element
			$(subLevel || this.levels[0]).addClass('nav-level-open');
		},
		// close the menu
		_resetMenu : function() {
			this._setTransform('translate3d(0,0,0)');
			this.level = 0;
			// remove class nav-pushed from main wrapper
			$(this.wrapper).removeClass('nav-pushed');
			$(this.navMenuHeaderBack).removeClass('nav-subcategory-opened');
			this._toggleLevels();
			this.open = false;
		},
		// close sub menus
		_closeMenu : function() {
			var translateVal = this.options.type === 'overlap' ? this.el.offsetWidth + ( this.level - 1 ) * this.options.levelSpacing : this.el.offsetWidth;
			this._setTransform( 'translate3d(' + translateVal + 'px,0,0)' );
			this._toggleLevels();
			if(this.level == 1) {
				$(this.navMenuHeaderBack).removeClass('nav-subcategory-opened');
			}
		},
		// translate the el
		_setTransform : function( val, el ) {
			el = el || this.wrapper;
			el.style.WebkitTransform = val;
			el.style.MozTransform = val;
			el.style.transform = val;
		},
		// removes classes nav-level-open from closing levels
		_toggleLevels : function() {
			for( var i = 0, len = this.levels.length; i < len; ++i ) {
				var levelEl = this.levels[i];
				if( levelEl.getAttribute( 'data-level' ) >= this.level + 1 ) {
                    $(levelEl).removeClass('nav-level-open');
                    $(levelEl).removeClass('nav-level-overlay');
				}
				else if( Number( levelEl.getAttribute( 'data-level' ) ) == this.level ) {
                    $(levelEl).removeClass('nav-level-overlay');
				}
			}
		}
	};

	// add to global namespace
	window.mlPushMenu = mlPushMenu;

} )( window );