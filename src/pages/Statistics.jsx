import { useEffect, useState } from "react";
import {
  getStatisticsSummary,
  getStatisticsGraph,
  getStatisticsTopProducts,
} from "../api/statisticsApi";

import SalesPurchaseChart from "../components/dashboard/SalesGraph";
import TopSellingProducts from "../components/dashboard/TopProducts";

import "../styles/statisticsStyles.css";

const Statistics = () => {
  const [summary, setSummary] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [topProducts, setTopProducts] = useState(null);

  const [loading, setLoading] = useState(true);

  const [kpiCards, setKpiCards] = useState([
    { id: "revenue", color: "yellow" },
    { id: "sold", color: "green" },
    { id: "stock", color: "purple" },
  ]);

  const [dragIndex, setDragIndex] = useState(null);

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        setLoading(true);

        const [summaryRes, graphRes, topProductsRes] = await Promise.all([
          getStatisticsSummary(),
          getStatisticsGraph(),
          getStatisticsTopProducts(),
        ]);

        setSummary(summaryRes);
        setGraphData(graphRes);
        setTopProducts(topProductsRes);
      } catch (err) {
        console.error("Failed to load statistics", err);
      } finally {
        setLoading(false);
      }
    };

    loadStatistics();
  }, []);

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDrop = (dropIndex) => {
    if (dragIndex === null || dragIndex === dropIndex) return;

    const updatedCards = [...kpiCards];
    const [moved] = updatedCards.splice(dragIndex, 1);
    updatedCards.splice(dropIndex, 0, moved);

    setKpiCards(updatedCards);
    setDragIndex(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Required to allow drop
  };

  if (loading || !summary) {
    return <div className="table-loading">Loading statistics...</div>;
  }

  return (
    <div className="statistics-container">
      {/* HEADER */}
      <div className="statistics-header">
        <h4>Statistics</h4>
      </div>

      <hr />

      {/* ================= KPI CARDS ================= */}
      <div className="statistics-kpi-row">
        {kpiCards.map((card, index) => {
          if (card.id === "revenue") {
            return (
              <div
                key={card.id}
                className="statistics-kpi-card yellow"
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
              >
                <p className="kpi-title">Total Revenue</p>
                <h3>₹{summary.totalRevenue}</h3>
                <p className="kpi-trend up">
                  ↑ {summary.revenueGrowth}% increased from last month
                </p>
              </div>
            );
          }

          if (card.id === "sold") {
            return (
              <div
                key={card.id}
                className="statistics-kpi-card green"
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
              >
                <p className="kpi-title">Products Sold</p>
                <h3>{summary.productsSold}</h3>
                <p className="kpi-trend up">
                  ↑ {summary.productsSoldGrowth}% increased from last month
                </p>
              </div>
            );
          }

          if (card.id === "stock") {
            return (
              <div
                key={card.id}
                className="statistics-kpi-card purple"
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
              >
                <p className="kpi-title">Products in Stock</p>
                <h3>{summary.productsInStock}</h3>
                <p className="kpi-trend up">
                  ↑ {summary.stockGrowth}% increased from last month
                </p>
              </div>
            );
          }

          return null;
        })}
      </div>

      <div className="statistics-row">
        <div className="statistics-col graph-col">
          <div className="card">
            <SalesPurchaseChart data={graphData} />
          </div>
        </div>

        <div className="statistics-col top-products-col">
          <div className="card">
            <TopSellingProducts data={topProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
