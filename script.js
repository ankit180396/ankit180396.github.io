const roleContent = {
  ai: {
    number: "01",
    label: "Applied AI",
    heading: "Grounded AI for operational workflows",
    copy: "LLM applications, RAG, Azure OpenAI, evaluation, and human-in-the-loop systems designed around accuracy, adoption, and measurable outcomes.",
    tags: ["LLMs", "RAG", "LangGraph", "Azure OpenAI"],
  },
  backend: {
    number: "02",
    label: "Backend engineering",
    heading: "Production APIs and dependable services",
    copy: "Python, FastAPI, C#/.NET, REST APIs, asynchronous jobs, validation, observability, and maintainable service boundaries built for real users.",
    tags: ["Python", "FastAPI", "C#/.NET", "REST APIs"],
  },
  data: {
    number: "03",
    label: "Data platforms",
    heading: "Reliable pipelines from ingestion to insight",
    copy: "High-volume ingestion, SQL optimization, Databricks, PySpark, AWS, and Azure workflows that connect operational data to decisions.",
    tags: ["SQL", "Databricks", "PySpark", "AWS & Azure"],
  },
};

const tabs = Array.from(document.querySelectorAll("[data-role]"));
const panel = document.querySelector("#role-detail");
const number = document.querySelector(".roleNumber");
const label = document.querySelector("#role-label");
const heading = document.querySelector("#role-heading");
const copy = document.querySelector("#role-copy");
const tags = document.querySelector("#role-tags");

function selectRole(role) {
  const content = roleContent[role];
  if (!content || !panel || !number || !label || !heading || !copy || !tags) return;

  tabs.forEach((tab) => {
    const selected = tab.dataset.role === role;
    tab.setAttribute("aria-selected", String(selected));
    tab.setAttribute("tabindex", selected ? "0" : "-1");
  });

  panel.setAttribute("aria-labelledby", `tab-${role}`);
  number.textContent = content.number;
  label.textContent = content.label;
  heading.textContent = content.heading;
  copy.textContent = content.copy;
  tags.replaceChildren(...content.tags.map((tag) => {
    const chip = document.createElement("span");
    chip.textContent = tag;
    return chip;
  }));
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectRole(tab.dataset.role));
  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const offset = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + offset + tabs.length) % tabs.length;
    tabs[nextIndex].focus();
    selectRole(tabs[nextIndex].dataset.role);
  });
});
