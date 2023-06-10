<?php
/*
Plugin Name: My Spinner Plugin
Description: A WordPress plugin for the spinner functionality.
Version: 1.0
Author: Your Name
*/

// Enqueue the necessary scripts and styles
function my_spinner_plugin_enqueue_scripts() {
    wp_enqueue_script('jquery');
    wp_enqueue_script('jquery-script', plugins_url('js/jquery.js', __FILE__), array('jquery'), '1.0', true);
    wp_enqueue_script('d3', plugins_url('js/d3.min.js', __FILE__), array(), '1.0', true);
    wp_enqueue_script('my-plugin-script', plugins_url('js/script.js', __FILE__), array('jquery'), '1.0', true);
    wp_enqueue_script('sw_alert', plugins_url('js/sw_alert.min.js', __FILE__), array(), '1.0', true);
    wp_enqueue_script('custom', plugins_url('js/custom.js', __FILE__), array(), '1.0', true);
    wp_enqueue_script('wheel-spinner', plugins_url('js/wheel-spinner.js', __FILE__), array(), '1.0', true);
    wp_enqueue_script('jquery-validate', plugins_url('js/jquery.validate.min.js', __FILE__), array('jquery'), '1.0', true);
    wp_enqueue_script('cookie', plugins_url('js/cookie.js', __FILE__), array(), '1.0', true);
   
    

    wp_enqueue_style('bootstrap', plugins_url('css/bootstrap.min.css', __FILE__), array(), '1.0');
    wp_enqueue_style('my-plugin-style', plugins_url('css/style.css', __FILE__), array(), '1.0');
}
add_action('wp_enqueue_scripts', 'my_spinner_plugin_enqueue_scripts');

// Render the spinner HTML
function my_spinner_plugin_render_spinner() {
    ob_start();
    ?>
     
    <section class="pt-0  mt-5 p-3 pt-0">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 pt-3 pb-3 shadow__11 p-0 m-0">
                    <div class="row">
                       
                        <!-- ----left side div---- -->
                        <div class="col-md-5 text-center pt-3 pb-3">
                            <div class="pt-2 pb-2 pl-2 pr-2"><select name id="colorPt"
                                    class="form-check-inline fw__normal fs-6">
                                    <option value>Color Category</option>
                                    <option value="1">Type 1</option>
                                    <option value="2">Type 2</option>
                                    <option value="3">Type 3</option>
                                    <option value="4">Type 4</option>
                                </select></div>
                            <div id="chart">


                            </div>
                            <div id="question"></div>
                        </div>


                        <audio id="spinnerSound" src="<?php echo plugins_url('sound/editvoice123456.mp3', __FILE__); ?>"></audio>

<audio id="clappingSound" src="<?php echo plugins_url('sound/clapping12.mp3', __FILE__); ?>"></audio>


                        <script>
                        // Get a reference to the audio element
const spinnerSound = document.getElementById("spinnerSound");

const clappingSound = document.getElementById("clappingSound");

// Get a reference to the button element
const spinButton = document.getElementById("chart");

// Add a click event listener to the button
spinButton.addEventListener("click", function () {
  // Play the spinner sound
  spinnerSound.play();
  alert("Muneeb");

  // Add an event listener to detect when the audio playback is complete
  spinnerSound.addEventListener("ended", function () {
    // Add your code here to perform actions when the audio finishes playing
    console.log("Spinner sound completed");
    // Add the additional audio playback code here
    clappingSound.play();
  });
});
                            
                        </script>

                        <div class="col-lg-2"></div>

                        <!-- ----right side div---- -->
                        <div class="col-md-5">
                            <!-- ---Participants---- -->
                            <h4 class="text__primary">Text</h4>
                            <div id="spinNameTest" contenteditable="true" class="form-control spinName fw-bold">
                                <div>YES</div>
                                <div>NO</div>
                                <div>YES</div>
                                <div>NO</div>
                                <div>YES</div>
                                <div>NO</div>

                            </div>
                          
                            <!-- ---Results---- -->
                            <h4 class="text__primary mt-5">Results<small style="cursor: pointer "
                                    onclick="$('.spinNameSelected').html('');preNames()" class="float-end">Clear</small>
                            </h4>
                            <div class="form-control h-100 overflow-auto spinNameSelected fw-bold mx-370  mt-2"></div>
                         
                        </div>
                    </div>
                </div>
            </div>
     
            <div class="row mt-5">
                <div class="col-md-12 mt-3 mb-3 text-center">
                    <div class="sharethis-inline-share-buttons"></div>
                </div>
            </div>

            <div class="row p-0 m-0">
                <div id="append-comment"></div>
            </div>
        </div>
        <div class="container-fluid"></div>
    </section>
  
  
    <?php
    return ob_get_clean();
}

// Shortcode for displaying the spinner
function my_spinner_plugin_shortcode() {
    return my_spinner_plugin_render_spinner();
}
add_shortcode('my_spinner_plugin', 'my_spinner_plugin_shortcode');
