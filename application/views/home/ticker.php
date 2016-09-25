<div ng-controller="tickerCtrl" class="ticker-container cool-shadow">
<div class="ticker ">
  <div ng-class="{moving: moving}" class="viewport">
    <div ng-repeat="box in boxes" class="box cool-border"><span>{{ box.title }}</span></div>
  </div>
</div>
</div>