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
                //component: "accordion",
                items: {
                    dimensions:{
                        uses:"dimensions"
                    },
                    sorting:{
                        uses:"sorting"
                    }                   
                }
            },
            //Paint resp.Rendering logic
            paint: function ( $element) {
                // Output values from the property panel
                $element.empty();

                var qTable = qlik.table(this);	//for Save
                //---------------RELOAD
                var app = qlik.currApp(this); //for Reload

                //Check if Qlik Sense Desktop or Server
                var isPersonalMode = true;

                var global = qlik.getGlobal();
                global.isPersonalMode(function (reply) {
                    isPersonalMode = reply.qReturn;
                });
                //---------------RELOAD

                //SAVE
				var $save = $(document.createElement('div'));
				$save.addClass('bootstrap_inside');
				$save.html('<button type="button" class="btn btn-default">Save</button>');
				$save.bind('click', function () {
				    qTable.exportData(
                  	{
                  	    format: "CSV_C",
                  	    download: true
                  	});			  
				});


                //EXPORT
				var $reload = $(document.createElement('div'));
				$reload.addClass('bootstrap_inside');
				$reload.html('<button type="button" class="btn btn-default">Reload</button>');

				$reload.bind('click', function () {
				   /*qTable.exportData(
                  {
                      format: "CSV_C",
                      download: true
                  });*/

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
	


    			$element.append( $save );
                $element.append( $reload );
				
            }
        };
    } );
