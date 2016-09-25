<md-dialog aria-label="Add Irregular Student" >
  <form ng-cloak name="addIrStudentForm" novalidate="">
    <md-toolbar>
      <div class="md-toolbar-tools">
        <h2>Add New Irregular Student</h2>
        <span flex></span>
        <md-button class="md-icon-button" ng-click="cancel()">
          <md-icon md-svg-src="assets/img/cd-icon-close.svg" aria-label="Close dialog"></md-icon>
        </md-button>
      </div>
    </md-toolbar>

    <md-dialog-content>
      <div class="md-dialog-content">
        <md-input-container class="md-block" flex-gt-sm="">
            <label>Student name</label>
            <input ng-model="student.student_name" name="name" required="true">
            <div ng-messages="addIrStudentForm.name.$error" role="alert">
              <div ng-message="required">
                Student Name is required
              </div>
            </div>
          </md-input-container>
          
          <div layout-gt-xs="row">
          
        <md-input-container  class="md-block" flex-gt-xs>
          <label>Class</label>
          <md-select ng-model="student.class_id" flex="100" required name="class">
            <md-option><em>None</em></md-option>
            <md-option ng-repeat="class in atClasses" ng-value="class.id">
              {{class.class_name}}
            </md-option>
          </md-select>
          <div class="errors" ng-messages="addIrStudentForm.class.$error">
            <div ng-message="required">Please select a class</div>
          </div>
        </md-input-container>
          
            <md-input-container >
              <label>Absent From</label>
              <md-datepicker ng-model="student.d_from" ></md-datepicker>
            </md-input-container>
            <md-input-container >
              <label>to</label>
              <md-datepicker ng-model="student.d_to"  ></md-datepicker>
            </md-input-container>
          </div>
          <md-input-container class="md-block">
              <label>Reason for absence</label>
              <textarea ng-model="student.reason" required="" md-minlength="5" md-maxlength="500" name="reason" rows="2" md-select-on-focus></textarea>
              <div class="hint">Please keep it in between 5 to 500 letters</div>
              <div class="errors" ng-messages="addIrStudentForm.reason.$error">
            <div ng-message="required">Please tell the reason for absence</div>
            <div ng-message="[maxlength,minlength]">Please keep it in between 5 to 500 letters</div>
          </div>
          </md-input-container>
      </div>
    </md-dialog-content>

    <md-dialog-actions layout="row">
      
      <span flex></span>
      <md-button ng-click="answer('cancel',addIrStudentForm)">
       Cancel
      </md-button>
      <md-button ng-click="answer(student,addIrStudentForm)">
        Add
      </md-button>
    </md-dialog-actions>
  </form>
</md-dialog>