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
                
            },
            //Paint resp.Rendering logic
            paint: function ($element, layout) {
                 // Output values from the property panel
                $element.empty();               
                //---------------RELOAD
                var app = qlik.currApp(this); //for Reload

                //Check if Qlik Sense Desktop or Server
                var isPersonalMode = true;

                var global = qlik.getGlobal();
                global.isPersonalMode(function (reply) {
                    isPersonalMode = reply.qReturn;
                });
                //---------------RELOAD

              
				var $reload = $(document.createElement('div'));
				$reload.addClass('bootstrap_inside');
				$reload.html('<button type="button" class="btn btn-default btn-block">Reload</button>');

				$reload.bind('click', function () {				
				    if (isPersonalMode) {
				        app.doReload(0, true, false).then(function (e) {
				            if (e.qReturn) {
				                app.doSave();
				                alert("Reload Successful");
				            }
				            else {
				                alert("Reload Failed");
				            }
				        });
				    }
				});
	


    		
                $element.append( $reload );
				
            }
        };
    } );
