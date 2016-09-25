<md-dialog aria-label="Add New Class">
  <form ng-cloak name="addSchoolForm" novalidate="">
    <md-toolbar>
      <div class="md-toolbar-tools">
        <h2>নতুন স্কুল যুক্ত করুন</h2>
        <span flex></span>
        <md-button class="md-icon-button" ng-click="cancel()">
          <md-icon md-svg-src="assets/img/cd-icon-close.svg" aria-label="Close dialog"></md-icon>
        </md-button>
      </div>
    </md-toolbar>

    <md-dialog-content>
      <div class="md-dialog-content">
      <span class="text-center text-danger" ng-if="addSchoolForm.$submitted&&addSchoolForm.$invalid&&result">
        {{result}}
      </span>
        <div layout="row">
          <md-input-container flex md-no-float class="md-block">
            <label>স্কুলের নাম</label>
            <input ng-model="school.school_name" name="name" required="true">
            <div ng-messages="addSchoolForm.name.$error" role="alert">
              <div ng-message="required">
                School Name is required
              </div>
            </div>
          </md-input-container>
          
        </div>
          <div layout="row">
            <md-input-container class="md-block" flex-gt-sm="">
            <label>ই-মেইল</label>
            <input ng-model="school.email" name="email" type="email" required="true">
            <div ng-messages="addSchoolForm.email.$error" role="alert">
              <div ng-message="required">
                You must give an email address
              </div>
              <div ng-message="pattern">
                looks like you entered an invalid email address
              </div>
            </div>
          </md-input-container>
          <md-input-container flex md-no-float class="md-block">
            <label>জেলা</label>
            <input ng-model="school.zilla" name="zilla" >
            
          </md-input-container>
          <md-input-container flex md-no-float class="md-block">
            <label>উপজেলা</label>
            <input ng-model="school.upozilla" name="upozilla" >
            
          </md-input-container>
          
          </div>
          <div layout="row">
            <div layout="row">
            <md-input-container class="md-block" flex-gt-sm="">
            <label>ইআইআইএন নাম্বার</label>
            <input ng-model="school.eiin_number" name="eiin_number" type="text" required="true">
            <div ng-messages="addSchoolForm.eiin_number.$error" role="alert">
                <div ng-message="required">
                  You must iclude a password for this school account
                </div>
              </div>
          </md-input-container>
            
          <md-input-container flex md-no-float class="md-block">
              <label>পাসওয়ার্ড</label>
              <input ng-model="school.password" name="password" type="{{p_type}}" required="true">
              
              <div ng-messages="addSchoolForm.password.$error" role="alert">
                <div ng-message="required">
                  You must iclude a password for this school account
                </div>
              </div>
            </md-input-container>
            <md-icon class="md-button md-fab md-mini md-primary" ng-click="changePassType()" flex="none" md-svg-icon="assets/img/accessories/show.svg" >
                <md-tooltip md-delay="700" md-direction="top">{{p_text}}</md-tooltip>
            </md-icon>
            <md-input-container class="md-block" flex-gt-sm="">
            <label>ওয়েব সাইট</label>
            <input ng-model="school.website" name="website" type="url">
          </md-input-container>
            
            </div>
            
          </div>
            <div layout="row">
            <md-input-container class="md-block" flex-gt-sm="">
            <label>ফোন</label>
            <input ng-model="school.phone" name="phone" type="text">
          </md-input-container>
              <md-input-container flex-gt-sm class="md-block">
          <label>ব্যবস্থাপনা</label>
          <md-select ng-model="school.management" name="management" >
            <md-option><em>None</em></md-option>
            <md-option ng-repeat="mgmt in managements" ng-value="mgmt.name">
              {{mgmt.name}}
            </md-option>
          </md-select>
        </md-input-container>
        <md-input-container flex-gt-sm class="md-block" >
          <label>ধরন</label>
          <md-select ng-model="school.type" name="type" >
            <md-option><em>None</em></md-option>
            <md-option ng-repeat="typ in types" ng-value="typ.name">
              {{typ.name}}
            </md-option>
          </md-select>
        </md-input-container>
            </div>
      </div>
      
    </md-dialog-content>

    <md-dialog-actions layout="row">
      
      <span flex></span>
      <md-button ng-click="answer('cancel',addSchoolForm)">
       Cancel
      </md-button>
      <md-button ng-click="answer(school,addSchoolForm)">
        Add
      </md-button>
    </md-dialog-actions>
  </form>
</md-dialog>