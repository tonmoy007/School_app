<md-content>
     <md-list  >
        <md-list-item class="md-2-line" ng-repeat="item in info">
          <img ng-src="assets/img/accessories/information.svg" class="md-avatar md-not-circle" alt="{{item.text}}">
          <div class="md-list-item-text" layout="column">
          
            <h3> {{ item.text }} <span class="badge">{{item.data}}</span></h3>
          </div>
          <md-divider ng-if="!$last"></md-divider>
        </md-list-item>
    </md-list>
</md-content>