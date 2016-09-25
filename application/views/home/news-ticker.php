<div class="white cool-border"  layout-padding>
    <ul vertical-ticker class="tickers">
          <li ng-repeat="item in myTickerItems" class="item-{{$index}}">
            <blockquote class="blockquote {{item.class}}">
                <p class="bq-title">{{item.title}}</p>
                <p>{{item.copy}}</p>
            </blockquote>
          </li>
</ul>
</div>