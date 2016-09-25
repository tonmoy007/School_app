<md-dialog aria-label="Add New Class">
  <form ng-cloak name="addClassForm" novalidate="">
    <md-toolbar>
      <div class="md-toolbar-tools">
        <h2>Add New Class</h2>
        <span flex></span>
        <md-button class="md-icon-button" ng-click="cancel()">
          <md-icon md-svg-src="assets/img/cd-icon-close.svg" aria-label="Close dialog"></md-icon>
        </md-button>
      </div>
    </md-toolbar>

    <md-dialog-content>
      <div class="md-dialog-content">
        <md-input-container class="md-block" flex-gt-sm="">
            <label>Class name</label>
            <input ng-model="class.class_name" name="name" required="true">
            <div ng-messages="addClassForm.name.$error" role="alert">
              <div ng-message="required">
                Class Name is required
              </div>
            </div>
          </md-input-container>
          <md-input-container class="md-block" flex-gt-sm="">
            <label>Section</label>
            <input ng-model="class.section" name="section" required="true">
            <div ng-messages="addClassForm.section.$error" role="alert">
              <div ng-message="required">
                You must give a section name
              </div>
            </div>
          </md-input-container>
          <md-input-container class="md-block" flex-gt-sm="">
            <label>Total Students</label>
            <input ng-model="class.total_student" name="total" type="number" required="true">
            <div ng-messages="addClassForm.total.$error" role="alert">
              <div ng-message="required">
                You must iclude total student quantity
              </div>
            </div>
          </md-input-container>
      </div>
    </md-dialog-content>

    <md-dialog-actions layout="row">
      
      <span flex></span>
      <md-button ng-click="answer('cancel',addClassForm)">
       Cancel
      </md-button>
      <md-button ng-click="answer(class,addClassForm)">
        Add
      </md-button>
    </md-dialog-actions>
  </form>
</md-dialog>