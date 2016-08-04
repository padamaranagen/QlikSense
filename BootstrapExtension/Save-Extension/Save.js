define( [
        'jquery',
        'qlik',
		'css!./scoped-bootstrap.css'
    ],
    function ( $, qlik ) {
        'use strict';
        
        return {
            // Define how our property panel looks like
            definition: {
                type: "items",
                component: "accordion",
                items: {
                    dimensions:{
                        uses:"dimensions"
                    },
                    measures:{
                        uses:"measures"
                    },
                    sorting:{
                        uses:"sorting"
                    },
                    apperance:{
                        uses:"settings"
                    }

                }
            },
            //Paint resp.Rendering logic
            paint: function ( $element) {
                // Output values from the property panel
                $element.empty();

                var qTable = qlik.table(this);

				 $element.empty();   

    			var $bootstrapStyle = $( document.createElement( 'div' ) );
    			$bootstrapStyle.addClass( 'bootstrap_inside' );
    			$bootstrapStyle.html( '<button class="btn btn-default">Save</button><br/>' );
				$bootstrapStyle.bind('click',function(){
					  qTable.exportData(
                    {
                        format:"CSV_C",
                        download: true
                    });
				});
    			$element.append( $bootstrapStyle );
				
            }
        };
    } );
