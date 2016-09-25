 <md-sidenav class="md-sidenav-right md-whiteframe-4dp" md-component-id="right">

  <md-toolbar class="md-theme-light">
    <div class="md-toolbar-tools">
      <h1><span>Edit</span>&nbsp;{{editingClass.class_name}}</h1>
      <span flex=""></span>
      <md-icon-button ng-click="close()" class="md-primary md-secondary pull-right">
        <md-icon md-svg-src="assets/img/cd-icon-close.svg" aria-label="Close right sidebar"></md-icon>
      </md-icon-button>
    </div>
    
  </md-toolbar>
  <md-content  layout-padding="">
    <form name="ClassEditForm" novalidate ng-submit="SubmitEditClassForm(ClassEditForm,editingClass)">
      <md-input-container>
        <label for="testInput">Class Name</label>
        <input type="text" id="testInput" name="name" ng-model="editingClass.class_name" md-autofocus="" required="">
        <div ng-messages="ClassEditForm.name.$error" role="alert">
          <div ng-message="required">
            Class Name is required
          </div>
        </div>
      </md-input-container>
      <md-input-container class="md-block" flex-gt-sm="">
            <label>Section</label>
            <input ng-model="editingClass.section" name="section" required="true">
            <div ng-messages="ClassEditForm.section.$error" role="alert">
              <div ng-message="required">
                You must give a section name
              </div>
            </div>
          </md-input-container>
          <md-input-container class="md-block" flex-gt-sm="">
            <label>Total Students</label>

            <input ng-model="editingClass.total_student" name="total"  required="true">
            <div ng-messages="ClassEditForm.total.$error" role="alert">
              <div ng-message="required">
                You must iclude total student quantity
              </div>
            </div>
          </md-input-container>
          <md-button class="md-raised" type="submit">Submit</md-button>
    </form>
    
  </md-content>

</md-sidenav>