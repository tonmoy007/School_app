<form layout-padding ng-submit="submit_report(shikhon_poribesh_form,data)" name="shikhon_poribesh_form">
    
        
        
    
      <div layout-padding>
        <div class="row">

        <div class="col-md-4 col-sm-6 col-xs-12 form-group" >
            <label class="form-label"  >
                <span class="index">১</span>গেইট আছে কিনা??
            </label>
            <md-radio-group   ng-model="data.gate" layout="row">
                <md-radio-button  value="আছে" class="md-primary">আছে</md-radio-button>
                <md-radio-button  value="নাই" class="md-primary"> নাই </md-radio-button>
            </md-radio-group>
        </div>

        

          <div class="col-md-4 col-sm-6 col-xs-12 form-group" >
            <label class="form-label">
                <span class="index">২</span>সীমানা প্রাচীর আছে কিনা??
            </label>
            <md-radio-group  ng-model="data.wall" layout="row">
                <md-radio-button  value="আছে" class="md-primary">আছে</md-radio-button>
                <md-radio-button  value="নাই" class="md-primary"> নাই </md-radio-button>
            </md-radio-group>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12 form-group" >
            <label class="form-label">
                <span class="index">৩</span>খেলার মাঠ আছে কিনা??
            </label>
            <md-radio-group  ng-model="data.field" layout="row">
                <md-radio-button  value="আছে" class="md-primary">আছে</md-radio-button>
                <md-radio-button  value="নাই" class="md-primary"> নাই </md-radio-button>
            </md-radio-group>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12 form-group" >
            <label class="form-label">
                <span class="index">৪</span>শিক্ষক কমন রুম আছে কিনা??
            </label>
            <md-radio-group  ng-model="data.teachers_common_room" layout="row">
                <md-radio-button  value="আছে" class="md-primary">আছে</md-radio-button>
                <md-radio-button  value="নাই" class="md-primary"> নাই </md-radio-button>
            </md-radio-group>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12 form-group" >
            <label class="form-label">
                <span class="index">৫</span>পর্যাপ্ত শ্রেণীকক্ষ আছে কিনা??
            </label>
            <md-radio-group  ng-model="data.class_teacher" layout="row">
                <md-radio-button  value="আছে" class="md-primary">আছে</md-radio-button>
                <md-radio-button  value="নাই" class="md-primary"> নাই </md-radio-button>
            </md-radio-group>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12 form-group" >
            <label class="form-label">
                <span class="index">৫</span>শ্রেণীকক্ষের মোট সংখ্যা?
            </label>
            <md-input-container md-no-float class="in_line" >

                <input type="text" name="" value="" aria-label="Class room" ng-model="data.class_room" placeholder="">
            </md-input-container>
          </div>

        </div>
        <div class="row">
          <md-input-container  class="col-md-4 col-sm-6 col-xs-12 form-group" >
            <label>শিক্ষা প্রতিষ্ঠানের আঙিনা</label>
            <md-select ng-model="data.school_yard" name="school_yard" >
              <md-option><em>None</em></md-option>
              <md-option ng-repeat="typ in school_yard" ng-value="typ">
                {{typ}}
              </md-option>
            </md-select>
          </md-input-container>
          <md-input-container  class="col-md-4 col-sm-6 col-xs-12 form-group" >
            <label>শিক্ষার্থীদের টয়লেট</label>
            <md-select ng-model="data.toilet" name="toilet" >
              <md-option><em>None</em></md-option>
              <md-option ng-repeat="tlt in toilet" ng-value="tlt">
                {{tlt}}
              </md-option>
            </md-select>
          </md-input-container>
          <md-input-container  class="col-md-4 col-sm-6 col-xs-12 form-group" >
            <label>শিক্ষার্থীদের নিরাপদ পানিয় জল</label>
            <md-select ng-model="data.safe_drinking_water" name="toilet" >
              <md-option><em>None</em></md-option>
              <md-option ng-repeat="drw in drinking_water" ng-value="drw">
                {{drw}}
              </md-option>
            </md-select>
          </md-input-container>
        </div>
      </div>
   
      
         <div layout="row" layout-align="center">
           <input type="submit" name="" value="Submit" class="md-button md-primary md-raised">
         </div>
    <md-progress-circular ng-if="submitting_report" ng-disabled="!submitting_report" class="md-hue-2 pull-right" md-diameter="20px"></md-progress-circular>
</form>