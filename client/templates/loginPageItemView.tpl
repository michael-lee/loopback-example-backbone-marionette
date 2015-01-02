<div id="login-template" class="container">
    <div class="row clearfix" id="login-form-container">

        <div class="col-md-5 well well-lg text-center">
            <h2>Login</h2>
            <div class="height:50px;">
                <ul id="login-errors" class="parsley-error-list"></ul>
            </div>

            <form id="login-form" class="form" data-validate="parsley">
                <fieldset>
                    <div class="control-group">
                        <div class="controls">
                            <input type="text" id="login-username-input" name="username" placeholder="Username" value="<%= user.username || '' %>"
                                data-required="true" data-notblank="true">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="control-group mb20">
                        <div class="controls">
                            <input class="input-medium" type="password" id="login-password-input" placeholder="Password" name="user_password" 
                                value="" data-required="true" data-notblank="true" data-rangelength="[5,25]">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div id="login-alert" class="alert alert-success navbar-button" style="display:none;"></div>
                    <a href="#" id="login-btn" class="btn btn-primary btn-lg" data-bypass>Login</a>
                </fieldset>
            </form>
        </div>

        <div class="col-md-2"></div>

        <div class="col-md-5 well well-lg text-center">
            <h2>Sign Up</h2>
            <div class="height:50px;">
                <ul id="signup-errors" class="parsley-error-list"></ul>
            </div>
            <form id="signup-form" class="form" data-validate="parsley">
                <fieldset>
                    <div class="control-group">
                        <div class="controls">
                            <input type="text" id="signup-username-input" name="username" placeholder="Username" value=""
                                data-required="true" data-notblank="true">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="controls">
                            <input class="input-medium" type="password" id="signup-password-input" placeholder="Password" name="user_password" 
                                value="" data-required="true" data-notblank="true" data-rangelength="[5,25]">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="control-group mb20">
                        <div class="controls">
                            <input class="input-medium" type="password" id="signup-password-confirm-input" placeholder="Confirm Password" name="user_password" 
                                value="" data-required="true" data-notblank="true" data-rangelength="[5,25]" data-equalto="#signup-password-input">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div id="signup-alert" class="alert alert-success navbar-button" style="display:none;"></div>
                    <a href="#" id="signup-btn" class="btn btn-primary btn-lg" data-bypass>Sign Up</a>
                </fieldset>
            </form>
        </div>

    </div>
</div>
