<md-content class="md-whiteframe-1dp bg-white">
    <md-toolbar>
        <md-toolbar-tools layout-padding>
            <h3>Attendence ( {{attendence.present/attendence.total*100|number:1}}% )</h3>

        </md-toolbar-tools>
    </md-toolbar>
    <div layout layout-padding bg-white layout="column">
        <h3 flex>TOTAL STUDENT  <strong>{{attendence.total}}</strong></h3>
        <h3 flex>PRESENT STUDENT  <strong>{{attendence.present}}</strong></h3>

    </div>
</md-content>